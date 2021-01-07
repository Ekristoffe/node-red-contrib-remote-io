module.exports = function(RED) {
    "use strict";

    function analogInput(config) {
        RED.nodes.createNode(this,config);
        //let context = this.context();
        let node = this;
        let sensorType = config.sensorType;
        let resolution = config.resolution;
        let low = config.low;
        let high = config.high;
        let prec = config.precision;
        let selectedProcess = config.selectedProcess;

        // scales number
        function scale(x, i_lo, i_hi, o_lo, o_hi) {
            let multiplier = (o_hi - o_lo) / (i_hi - i_lo);
            let scaledVal = (multiplier * limit(i_lo, x, i_hi)) + o_lo;
            return(scaledVal);
        }
        function limit(i_lo, x, i_hi){
            let last = 0;
            if (x<i_lo){
                return(i_lo);
            } else {
                if (x>i_hi){
                    return(i_hi);
                } else {
                    return(x);
                }
            }
        }
        function toFixed( num, precision ) {
            return (+(Math.round(+(num + "e" + precision)) + "e" + -precision)).toFixed(precision);
        }
        this.on("input", function(msg) {
            let rawInput = parseInt(msg.payload, 10);
            let rawMinInput = 0;
            let rawMaxInput = 0;
            let outputMsg = {};
            let actualSensorValue;
            let val_10vdc = 0;
            let val_int16 = 0;
            let val_scaled = 0;
            // set the max value
            switch(resolution)  {
                case "12_Bit":
                    rawMaxInput = 32767;
                    break;
                case "13_Bit":
                    rawMaxInput = 32767;
                    break;
                case "13_Bit_signed":
                    rawMinInput = -32767;
                    rawMaxInput = 32767;
                    break;
                case "14_Bit":
                    rawMaxInput = 32767;
                    break;
                case "15_Bit":
                    rawMaxInput = 32767;
                    break;
                case "15_Bit_signed":
                    rawMinInput = -32767;
                    rawMaxInput = 32767;
                    break;
                case "16_Bit":
                    rawMaxInput = 65535;
                    break;
            }
            switch(sensorType)  {
                case "0-20mA":
                    actualSensorValue = scale(msg.payload, rawMinInput, rawMaxInput, 0, 20);
                    break;
                case "4-20mA":
                    actualSensorValue = scale(msg.payload, rawMinInput, rawMaxInput, 4, 20);
                    break;
                case "0-10VDC":
                    actualSensorValue = scale(msg.payload, rawMinInput, rawMaxInput, 0, 10);
                    break;
                case "+/-10VDC": // meeds work
                    if (msg.payload <= 32767){
                        val_10vdc = scale(msg.payload, 0, rawMaxInput, 0, 10);
                        actualSensorValue = val_10vdc;
                        val_int16 = msg.payload;
                    } else {
                        val_10vdc = (msg.payload << 1);
                        val_10vdc = (val_10vdc >> 1); 
                        val_10vdc = val_10vdc * -1;
                        val_int16 = val_10vdc + 32767; 
                        //val_10vdc = scale(val_10vdc, rawMinInput, rawMaxInput, -10, 0);  
                        val_10vdc = scale(val_int16, rawMinInput, 0, -10, 0) + 10;  
                        actualSensorValue = val_10vdc;
                    }
                    break;
                case "0-30VDC":
                    actualSensorValue = scale(msg.payload, rawMinInput, rawMaxInput, 0, 30);
                    break;
            }
            // operation based on processSelected
            switch(selectedProcess) {
                case "Raw":   
                    if (sensorType === "+/-10VDC"){
                        val_int16 = val_int16; // assigned above
                    } else {
                         val_int16 = msg.payload;
                    }
                    outputMsg.payload = val_int16;
                    break;
                case "SensorVal":
                    outputMsg.payload = parseFloat(toFixed(actualSensorValue, prec));
                    break;
                case "Scaled":
                    if (sensorType === "+/-10VDC"){
                        let scaledHold = scale(val_10vdc+ 10, 0, 20, low, high);
                    } else {
                        let scaledHold = scale(msg.payload, rawMinInput, rawMaxInput, low, high);
                    }
                    outputMsg.payload = parseFloat(toFixed(scaledHold, prec));
                break;
            }
            node.send(outputMsg);
        });
    }
    RED.nodes.registerType("Analog Input",analogInput);
};

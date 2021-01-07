module.exports = function(RED) {
    "use strict";

    function analogOutput(config) {
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
            let rawMinOutput = 0;
            let rawMaxOutput = 0;
            let outputMsg = {};
            let actualSensorValue;
            let val_10vdc = 0;
            let val_int16 = 0;
            let scaledHold = 0;

            // set the max value
            switch(resolution)  {
                case "12_Bit":
                    rawMinOutput = 0;
                    rawMaxOutput = 32767;
                    break;
                case "13_Bit":
                    rawMinOutput = 0;
                    rawMaxOutput = 32767;
                    break;
                case "13_Bit_signed":
                    rawMinOutput = -32768;
                    rawMaxOutput = 32767;
                    break;
                case "14_Bit":
                    rawMinOutput = 0;
                    rawMaxOutput = 32767;
                    break;
                case "15_Bit":
                    rawMinOutput = 0;
                    rawMaxOutput = 32767;
                    break;
                case "15_Bit_signed":
                    rawMinOutput = -32767;
                    rawMaxOutput = 32767;
                    break;
                case "16_Bit":
                    rawMinOutput = 0;
                    rawMaxOutput = 65535;
                    break;
            }

            switch(sensorType)  {
                case "0-20mA":
                    //actualSensorValue = scale(msg.payload, 0, 20, rawMinOutput, rawMaxOutput);
                    break;
                case "4-20mA":
                    //actualSensorValue = scale(msg.payload, 4, 20, rawMinOutput, rawMaxOutput);
                    break;
                case "0-10VDC":
                    //actualSensorValue = scale(msg.payload, 0, 10, rawMinOutput, rawMaxOutput);
                    break;
                case "+/-10VDC": 
                    if (msg.payload < (high-low)/2){
                        let valX = 0;
                        valX = scale(msg.payload, low, (high-low)/2, 0, rawMaxOutput); 
                        val_10vdc = valX * -1 + 65535;
                    } else {
                        val_10vdc = scale(msg.payload, (high-low)/2, high, 0, rawMaxOutput); 
                        val_10vdc = val_10vdc + 32767;
                    }
                    actualSensorValue = val_10vdc;   
                    break;
                case "0-30VDC":
                    //actualSensorValue = scale(msg.payload, 0, 30, rawMinOutput, rawMaxOutput);
                    break;
            }
            // operation based on processSelected
            switch(selectedProcess) {
                case "Raw":
                    outputMsg.payload = msg.payload;
                    break;
                case "SensorVal":
                    outputMsg.payload = actualSensorValue;
                    break;
                case "Scaled":
                    if (sensorType === "+/-10VDC"){
                        scaledHold = actualSensorValue;
                    } else {
                        scaledHold = scale(msg.payload, low, high, rawMinOutput, rawMaxOutput);
                    }
                    outputMsg.payload = toFixed(scaledHold, 0); 
                    break;
            }
            node.send(outputMsg);
        });
    }
    RED.nodes.registerType("Analog Output", analogOutput);
};

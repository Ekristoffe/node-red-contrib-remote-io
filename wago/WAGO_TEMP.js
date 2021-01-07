module.exports = function(RED) {
    "use strict";

    function tempInput(config) {
        RED.nodes.createNode(this,config);
        this.signalType = config.signalType;
        let context = this.context();
        let node = this;
        this.on("input", function(msg) {
            let rawInput = parseInt(msg.payload, 10);
            let sensorType = this.sensorType;
            let signalType = this.signalType;
            let holdSignal;
            let outputMsg = {};

        function toFixed( num, precision ) {
        return (+(Math.round(+(num + "e" + precision)) + "e" + -precision)).toFixed(precision);
        }

            if (signalType === "Celsius") {
                outputMsg.payload = toFixed(parseInt(msg.payload, 10) / 10, 2);
            }
            if (signalType === "Farenheit") {
                outputMsg.payload = parseFloat(toFixed(parseInt((msg.payload) / 10, 10) * (9/5) + 32, 2));
            }
            node.send(outputMsg);
        
        });
    }
    RED.nodes.registerType("Temperature Input",tempInput);
};

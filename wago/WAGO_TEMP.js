module.exports = function(RED) {
	"use strict";

    function tempInput(n) {
        RED.nodes.createNode(this,n);
        this.signalType = n.signalType;
        var context = this.context();
        var node = this;
        this.on('input', function(msg) {
        	var rawInput = parseInt(msg.payload);
        	var sensorType = this.sensorType;
        	var signalType = this.signalType;
        	var holdSignal;
        	var outputMsg = {};

        function toFixed( num, precision ) {
        return (+(Math.round(+(num + 'e' + precision)) + 'e' + -precision)).toFixed(precision);
        }

        	if (signalType == "Celsius")	{
        		outputMsg.payload = toFixed(parseInt(msg.payload) / 10, 2);
        	}
        	if (signalType == "Farenheit")	{
        		outputMsg.payload = parseFloat(toFixed(parseInt((msg.payload) / 10) * (9/5) + 32, 2));        		
        	}
        	node.send(outputMsg);
        
        });
    }
    RED.nodes.registerType("Temperature Input",tempInput);
};

let helper = require("./helper");

module.exports = function(RED) {
	"use strict";

	function tempInput(n) {
		RED.nodes.createNode(this,n);
		//var context = this.context();
		var node = this;
		var wordOffset = parseInt(n.wordOffset,10);
		var sensorType = n.sensorType;
		var signalType = n.signalType;
		//this.signalType = n.signalType;
		var name = n.name;
		var topic = n.topic;
		
		this.on("input", function(msg) {
			var _object;
			var _rawInput = 0;
			// Test is we have an array as input
			if (msg.payload.constructor === Array) {
				if ((wordOffset >= 0) && (wordOffset <= msg.payload.length)) {
					_rawInput = parseInt(msg.payload[wordOffset],10);
				} else {
					node.error("node offset should be between 0 and " + msg.payload.length);
					node.status({fill: "red",shape: "ring",text: "error"});
					return;
				}
			} else {
				_rawInput = parseInt(msg.payload,10);
			}
			
			var celciusTemp = (_rawInput / 10);
			
			// operation based on signalType
			switch(signalType) {
				case "Celsius":
					_object = {topic:topic,payload:helper.toFixed(celciusTemp, 2)};
					break;
				case "Farenheit":
					_object = {topic:topic,payload:helper.toFixed((((celciusTemp * 9) / 5) + 32), 2)};
					break;
				case "Kelvin":
					_object = {topic:topic,payload:helper.toFixed((celciusTemp + 273.15), 2)};
					break;
				default:
					_object = {topic:topic,payload:helper.toFixed(celciusTemp, 2)};
					break;
			}
			node.send(_object);
		
		});
		node.status({fill: "green",shape: "ring",text: sensorType + " input (" + signalType + ")"});
	}
	RED.nodes.registerType("Temperature Input v2",tempInput);
};

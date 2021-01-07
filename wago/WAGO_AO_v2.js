const helper = require("./helper");

module.exports = function(RED) {
	"use strict";

	function analogOutput(n) {
		RED.nodes.createNode(this,n);
		var context = this.context();
		var node = this;
		var wordOffset = parseInt(n.wordOffset,10);
		var module = n.module;
		var inputData = n.inputData;
		var sensorLow = parseInt(n.sensorLow,10);
		var sensorHigh = parseInt(n.sensorHigh,10);
		var signalLow = parseInt(n.signalLow,10);
		var signalHigh = parseInt(n.signalHigh,10);
		var rawLow = parseInt(n.rawLow,10);
		var rawHigh = parseInt(n.rawHigh,10);
		var rawMask = 0xFFFF >>> 0;
		var raw2Complement = n.raw2Complement;
		var resolution = n.resolution;
		var startbit = parseInt(n.startbit,10);
		var name = n.name;
		var topic = n.topic;
		// Init the array of data
		var _data = [];
		if (wordOffset < 0) {
			wordOffset = 0;
		}
		for (var i = 0; i <= wordOffset; i++) {
			_data[i] = 0;
		}
		context.set("data", _data);
		
		switch(module) {
			case "750-550":
				rawLow = 0; // 0x0000
				rawHigh = 32767; // 0x7FFF
				rawMask = 0x7FFF >>> 0; // 16 bit
				raw2Complement = false;
				resolution = "16_Bit";
				startbit = 0;
				signalLow = 0;
				signalHigh = 10;
				break;
			case "750-552":
				rawLow = 0; // 0x0000
				rawHigh = 32767; // 0x7FFF
				rawMask = 0x7FFF >>> 0; // 16 bit
				raw2Complement = false;
				resolution = "16_Bit";
				startbit = 0;
				signalLow = 0;
				signalHigh = 20;
				break; 

			case "750-553":
				rawLow = 0; // 0x0000
				rawHigh = 32767; // 0x7FFF
				rawMask = 0x7FFF >>> 0; // 16 bit
				raw2Complement = false;
				resolution = "16_Bit";
				startbit = 0;
				signalLow = 0;
				signalHigh = 20;
				break;
			case "750-554":
				rawLow = 0; // 0x0000
				rawHigh = 32767; // 0x7FFF
				rawMask = 0x7FFF >>> 0; // 16 bit
				raw2Complement = false;
				resolution = "16_Bit";
				startbit = 0;
				signalLow = 4;
				signalHigh = 20;
				break;
			case "750-555":
				rawLow = 0; // 0x0000
				rawHigh = 32767; // 0x7FFF
				rawMask = 0x7FFF >>> 0; // 16 bit
				raw2Complement = false;
				resolution = "16_Bit";
				startbit = 0;
				signalLow = 4;
				signalHigh = 20;
				break;
			case "750-556":
				rawLow = -32767; // 0x8001
				rawHigh = 32767; // 0x7FFF
				rawMask = 0xFFFF >>> 0; // 16 bit
				raw2Complement = true;
				resolution = "16_Bit";
				startbit = 0;
				signalLow = -10;
				signalHigh = 10;
				break;
			case "750-557":
				rawLow = -32767; // 0x8001
				rawHigh = 32767; // 0x7FFF
				rawMask = 0xFFFF >>> 0; // 16 bit
				raw2Complement = true;
				resolution = "16_Bit";
				startbit = 0;
				signalLow = -10;
				signalHigh = 10;
				break;
			case "750-559":
				rawLow = 0; // 0x0000
				rawHigh = 32767; // 0x7FFF
				rawMask = 0x7FFF >>> 0; // 16 bit
				raw2Complement = false;
				resolution = "16_Bit";
				startbit = 0;
				signalLow = 0;
				signalHigh = 10;
				break;
			case "750-560":
				rawLow = 0; // 0x0000
				rawHigh = 32767; // 0x7FFF
				rawMask = 0x7FFF >>> 0; // 16 bit
				raw2Complement = false;
				resolution = "16_Bit";
				startbit = 5;
				signalLow = 0;
				signalHigh = 10;
				break;
			case "750-562":
				rawLow = 0; // 0x0000
				rawHigh = 65535; // 0xFFFF
				rawMask = 0xFFFF >>> 0; // 16 bit
				raw2Complement = false;
				resolution = "16_Bit";
				startbit = 0;
				signalLow = 0;
				signalHigh = 10;
				break;
			case "750-563":
				rawLow = 0; // 0x0000
				rawHigh = 65535; // 0xFFFF
				rawMask = 0xFFFF >>> 0; // 16 bit
				raw2Complement = false;
				resolution = "16_Bit";
				startbit = 0;
				signalLow = 4;
				signalHigh = 20;
				break;
			case "750-597":
				rawLow = 0; // 0x0000
				rawHigh = 32767; // 0x7FFF
				rawMask = 0x7FFF >>> 0; // 16 bit
				raw2Complement = false;
				resolution = "16_Bit";
				startbit = 0;
				signalLow = 0;
				signalHigh = 10;
				break;
			default:
				rawMask = 0xFFFF >>> 0;
				switch(resolution) {
					case "8_Bit":
						rawMask = (Math.pow(2,8) - 1) >>> 0;
						break;
					case "12_Bit":
						rawMask = (Math.pow(2,12) - 1) >>> 0;
						break;
					case "16_Bit":
						rawMask = (Math.pow(2,16) - 1) >>> 0;
						break;
					case "20_Bit":
						rawMask = (Math.pow(2,20) - 1) >>> 0;
						break;
					case "24_Bit":
						rawMask = (Math.pow(2,24) - 1) >>> 0;
						break;
					case "28_Bit":
						rawMask = (Math.pow(2,28) - 1) >>> 0;
						break;
					case "32_Bit":
						rawMask = (Math.pow(2,32) - 1) >>> 0;
						break;
					default:
						rawMask = (Math.pow(2,16) - 1) >>> 0;
						break;
				}
				rawMask = (rawMask >>> startbit) >>> 0;
				rawMask = (rawMask << startbit) >>> 0;
				break;
		}
		
		this.on("input", function(msg) {
			var _object = [];
			var _rawOutput = 0;
			var _rawValue = parseInt(msg.payload,10);
			
			// operation based on outputData
			switch(inputData) {
				case "Raw":
					_rawOutput = _rawValue;
					break;
				case "Signal":
					_rawOutput = helper.scale(_rawValue, signalLow, signalHigh, rawLow, rawHigh);
					_rawOutput = helper.fromSigned(resolution, helper.toFixed(_rawOutput, 0), raw2Complement);
					break;
				case "Sensor":
					_rawOutput = helper.scale(_rawValue, sensorLow, sensorHigh, rawLow, rawHigh);
					_rawOutput = helper.fromSigned(resolution, helper.toFixed(_rawOutput, 0), raw2Complement);
					break;
				default:
					_rawOutput = _rawValue;
					break;
			}
			// get the context value
			var _data = context.get("data") || [];
			// copy the output payload
			_data[wordOffset] = _rawOutput;
			// store the context value back
			context.set("data", _data);
			_object[0] = {topic:topic,payload:_rawOutput};
			_object[1] = {topic:topic,payload:_data};
			node.send([_object[0], _object[1]]);
		});
		
		if (module === "none") {
			node.status({fill: "green",shape: "ring",text: "Analog output"});
		} else{
			node.status({fill: "green",shape: "ring",text: module});
		}
	}
	RED.nodes.registerType("Analog Output v2", analogOutput);
};

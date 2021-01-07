let helper = require("./helper");

module.exports = function(RED) {
	"use strict";

	function analogInput(n) {
		RED.nodes.createNode(this,n);
		//var context = this.context();
		var node = this;
		var wordOffset = parseInt(n.wordOffset,10);
		var module = n.module;
		var outputData = n.outputData;
		var outputPrecision = parseInt(n.outputPrecision,10);
		var rawLow = parseInt(n.rawLow,10);
		var rawHigh = parseInt(n.rawHigh,10);
		var rawMask = 0xFFFF >>> 0;
		var raw2Complement = n.raw2Complement;
		var resolution = n.resolution;
		var startbit = parseInt(n.startbit,10);
		var signalLow = parseInt(n.signalLow,10);
		var signalHigh = parseInt(n.signalHigh,10);
		var sensorLow = parseInt(n.sensorLow,10);
		var sensorHigh = parseInt(n.sensorHigh,10);
		var name = n.name;
		var topic = n.topic;
		
		switch(module) {
			case "750-452":
				rawLow = 0x0000; // 0
				rawHigh = 0x7FF8; // 32760
				rawMask = 0x7FF8 >>> 0; // 12 bit
				raw2Complement = false;
				resolution = "16_Bit";
				startbit = 3;
				signalLow = 0;
				signalHigh = 20;
				break;
			case "750-453":
				rawLow = 0x0000; // 0
				rawHigh = 0x7FF8; // 32760
				rawMask = 0x7FF8 >>> 0; // 12 bit
				raw2Complement = false;
				resolution = "16_Bit";
				startbit = 3;
				signalLow = 0;
				signalHigh = 20;
				break;
			case "750-454":
				rawLow = 0x0000; // 0
				rawHigh = 0x7FF8; // 32760
				rawMask = 0x7FF8 >>> 0; // 12 bit
				raw2Complement = false;
				resolution = "16_Bit";
				startbit = 3;
				signalLow = 4;
				signalHigh = 20;
				break;
			case "750-455":
				rawLow = 0x0000; // 0
				rawHigh = 0x7FF8; // 32760
				rawMask = 0x7FF8 >>> 0; // 12 bit
				raw2Complement = false;
				resolution = "16_Bit";
				startbit = 3;
				signalLow = 4;
				signalHigh = 20;
				break;
			case "750-456":
				rawLow = 0x8000; // −32768
				rawHigh = 0x7FF8; // 32760
				rawMask = 0xFFF8 >>> 0; // 12 bit
				raw2Complement = true;
				resolution = "16_Bit";
				startbit = 3;
				signalLow = -10;
				signalHigh = 10;
				break;
			case "750-457":
				rawLow = 0x8000; // −32768
				rawHigh = 0x7FF8; // 32760
				rawMask = 0xFFF8 >>> 0; // 12 bit
				raw2Complement = true;
				resolution = "16_Bit";
				startbit = 3;
				signalLow = -10;
				signalHigh = 10;
				break;
			case "750-459":
				rawLow = 0x0000; // 0
				rawHigh = 0x7FF8; // 32760
				rawMask = 0x7FF8 >>> 0; // 12 bit
				raw2Complement = false;
				resolution = "16_Bit";
				startbit = 3;
				signalLow = 0;
				signalHigh = 10;
				break;
				
			case "750-465":
				rawLow = 0x0000; // 0
				rawHigh = 0x7FF8; // 32760
				rawMask = 0x7FF8 >>> 0; // 12 bit
				raw2Complement = false;
				resolution = "16_Bit";
				startbit = 3;
				signalLow = 0;
				signalHigh = 20;
				break;
			case "750-466":
				rawLow = 0x0000; // 0
				rawHigh = 0x7FF8; // 32760
				rawMask = 0x7FF8 >>> 0; // 12 bit
				raw2Complement = false;
				resolution = "16_Bit";
				startbit = 3;
				signalLow = 4;
				signalHigh = 20;
				break;
			case "750-467":
				rawLow = 0x0000; // 0
				rawHigh = 0x7FF8; // 32760
				rawMask = 0x7FF8 >>> 0; // 12 bit
				raw2Complement = false;
				resolution = "16_Bit";
				startbit = 3;
				signalLow = 0;
				signalHigh = 10;
				break;
			case "750-468":
				rawLow = 0x0000; // 0
				rawHigh = 0x7FF8; // 32760
				rawMask = 0x7FF8 >>> 0; // 12 bit
				raw2Complement = false;
				resolution = "16_Bit";
				startbit = 3;
				signalLow = 0;
				signalHigh = 10;
				break;
				
			case "750-470":
				rawLow = 0x0000; // 0
				rawHigh = 0x5000; // 20480
				rawMask = 0x7FF8 >>> 0; // 12 bit
				raw2Complement = false;
				resolution = "16_Bit";
				startbit = 3;
				signalLow = 0;
				signalHigh = 20;
				break;
			case "750-471":
				rawLow = 0x0000; // 0
				rawHigh = 0x7FFF; // 32767
				rawMask = 0x7FFF >>> 0; // 15 bit
				raw2Complement = false;
				resolution = "16_Bit";
				startbit = 0;
				signalLow = 4;
				signalHigh = 20;
				break;
			case "750-472":
				rawLow = 0x0000; // 0
				rawHigh = 0x7FFF; // 32767
				rawMask = 0x7FFF >>> 0; // 15 bit
				raw2Complement = false;
				resolution = "16_Bit";
				startbit = 0;
				signalLow = 0;
				signalHigh = 20;
				break;
			case "750-473":
				rawLow = 0x0000; // 0
				rawHigh = 0x7FF8; // 32760
				rawMask = 0x7FF8 >>> 0; // 12 bit
				raw2Complement = false;
				resolution = "16_Bit";
				startbit = 3;
				signalLow = 4;
				signalHigh = 20;
				break;
			case "750-474":
				rawLow = 0x0000; // 0
				rawHigh = 0x7FFF; // 32767
				rawMask = 0x7FFF >>> 0; // 15 bit
				raw2Complement = false;
				resolution = "16_Bit";
				startbit = 0;
				signalLow = 4;
				signalHigh = 20;
				break;
			case "750-475":
				rawLow = 0x0000; // 0
				rawHigh = 0x2710; // 10000
				rawMask = 0x7FFF >>> 0; // 15 bit
				raw2Complement = false;
				resolution = "16_Bit";
				startbit = 0;
				signalLow = 0;
				signalHigh = 1;
				break;
			case "750-475/020-000":
				rawLow = 0x0000; // 0
				rawHigh = 0x6AA9; // 10000
				rawMask = 0x7FFF >>> 0; // 15 bit
				raw2Complement = false;
				resolution = "16_Bit";
				startbit = 0;
				signalLow = 0;
				signalHigh = 5;
				break;
			case "750-476":
				rawLow = 0x8000; // −32768
				rawHigh = 0x7FFF; // 32767
				rawMask = 0xFFFF >>> 0; // 16 bit
				raw2Complement = true;
				resolution = "16_Bit";
				startbit = 0;
				signalLow = -10;
				signalHigh = 10;
				break;
			case "750-477":
				rawLow = 0x0000; // 0
				rawHigh = 0x2710; // 10000
				rawMask = 0x7FFF >>> 0; // 15 bit
				raw2Complement = false;
				resolution = "16_Bit";
				startbit = 0;
				signalLow = 0;
				signalHigh = 10;
				break;
			case "750-478":
				rawLow = 0x0000; // 0
				rawHigh = 0x7FFF; // 32767
				rawMask = 0x7FFF >>> 0; // 15 bit
				raw2Complement = false;
				resolution = "16_Bit";
				startbit = 0;
				signalLow = 0;
				signalHigh = 10;
				break;
			case "750-479":
				rawLow = 0x8000; // −32768
				rawHigh = 0x7FFC; // 32764
				rawMask = 0xFFFC >>> 0; // 14 bit
				raw2Complement = true;
				resolution = "16_Bit";
				startbit = 2;
				signalLow = -10;
				signalHigh = 10;
				break;
				
			case "750-480":
				rawLow = 0x0000; // 0
				rawHigh = 0x7FFC; // 32764
				rawMask = 0x7FFC >>> 0; // 13 bit
				raw2Complement = false;
				resolution = "16_Bit";
				startbit = 2;
				signalLow = 0;
				signalHigh = 20;
				break;
			case "750-482":
				rawLow = 0x0000; // 0
				rawHigh = 0x7FFC; // 32764
				rawMask = 0x7FFC >>> 0; // 13 bit
				raw2Complement = false;
				resolution = "16_Bit";
				startbit = 2;
				signalLow = 4;
				signalHigh = 20;
				break;
			case "750-483":
				rawLow = 0x0000; // 0
				rawHigh = 0x7FFE; // 32766
				rawMask = 0x7FFE >>> 0; // 14 bit
				raw2Complement = false;
				resolution = "16_Bit";
				startbit = 1;
				signalLow = 0;
				signalHigh = 30;
				break;
				
			case "750-492":
				rawLow = 0x0000; // 0
				rawHigh = 0x7FFC; // 32764
				rawMask = 0x7FFC >>> 0; // 13 bit
				raw2Complement = false;
				resolution = "16_Bit";
				startbit = 2;
				signalLow = 4;
				signalHigh = 20;
				break;
			case "750-496":
				rawLow = 0x0000; // 0
				rawHigh = 0x7FF8; // 32760
				rawMask = 0x7FF8 >>> 0; // 12 bit
				raw2Complement = false;
				resolution = "16_Bit";
				startbit = 3;
				signalLow = 4;
				signalHigh = 20;
				break;
			case "750-497":
				rawLow = 0x0000; // 0
				rawHigh = 0x7FF8; // 32760
				rawMask = 0x7FF8 >>> 0; // 12 bit
				raw2Complement = false;
				resolution = "16_Bit";
				startbit = 3;
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
				rawMask = (rawMask << startbit) >>> 0;
				break;
		}
		
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
			// convert the raw data to signed data
			var _rawValue = helper.toSigned(resolution, _rawInput, raw2Complement);
			
			// operation based on outputData
			switch(outputData) {
				case "Raw":
					_object = {topic:topic,payload:_rawValue};
					break;
				case "Signal":
					var _signalValue = helper.scale(_rawValue, rawLow, rawHigh, signalLow, signalHigh);
					_signalValue = parseFloat(helper.toFixed(_signalValue, outputPrecision));
					_object = {topic:topic,payload:_signalValue};
					break;
				case "Sensor":
					var _sensorValue = helper.scale(_rawValue, rawLow, rawHigh, sensorLow, sensorHigh);
					_sensorValue = parseFloat(helper.toFixed(_sensorValue, outputPrecision));
					_object = {topic:topic,payload:_sensorValue};
					break;
				default:
					_object = {topic:topic,payload:_rawValue};
					break;
			}
			node.send(_object);
		});
		
		if (module === "none") {
			node.status({fill: "green",shape: "ring",text: "Analog input"});
		} else{
			node.status({fill: "green",shape: "ring",text: module});
		}
		
	}
	RED.nodes.registerType("Analog Input v2",analogInput);
};

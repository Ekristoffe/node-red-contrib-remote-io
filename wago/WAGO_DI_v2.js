module.exports = function(RED) {
	"use strict";

	function digitalInput(n) {
		RED.nodes.createNode(this,n);
		var node = this;
		var bitSize = parseInt(n.outputs,10);
		var wordOffset = parseInt(n.wordOffset,10);
		var bitOffset = parseInt(n.bitOffset,10);
		var name = n.name;
		var topic = n.topic;

		this.on("input", function(msg) {
			var _object = [];
			// Test is we have an array as input
			if (msg.payload.constructor === Array) {
				// Test if the array is an array of boolean
				if (msg.payload[0].constructor === Boolean) {
					for (var i = 0; i < bitSize; i++) {
						// Copy the input payload in the right output payload (with the offset)
						_object[i] = {topic:(topic + "." + i),payload:(msg.payload[bitOffset + i] ? true : false)};
					}
				} else if (msg.payload[0].constructor === Number) {
					var _wordOffset = wordOffset;
					var _mask = 0x0001 << bitOffset;
					for (var i = 0; i < bitSize; i++) {
						if ((_mask > 0x8000) || (_mask === 0x0000)) {
							_wordOffset = _wordOffset + 1;
							_mask = 0x0001;
						}
						// Test the input payload & _mask and set corresponding payload
						_object[i] = {topic:(topic + "." + i),payload:((msg.payload[_wordOffset] & _mask) ? true : false)};
						// shift the mask to select the next bit
						_mask = _mask << 1;
					}
				}
			} else {
				var _mask = 0x0001 << bitOffset;
				for (var i = 0; i < bitSize; i++) {
					// Test the input payload & _mask and set corresponding payload
					_object[i] = {topic:(topic + "." + i),payload:((msg.payload & _mask) ? true : false)};
					// shift the mask to select the next bit
					_mask = _mask << 1;
				}
			}
			//o = m.reverse();
			node.send(_object);
		});
		node.status({fill: "green",shape: "ring",text: bitSize + " digital inputs"});
	}
	RED.nodes.registerType("Digital Input v2",digitalInput);
};

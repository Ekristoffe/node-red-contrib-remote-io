module.exports = function(RED) {
	"use strict";

	function digitalOutput(n) {
		RED.nodes.createNode(this,n);
		var context = this.context();
		var node = this;
		var wordOffset = parseInt(n.wordOffset,10);
		var bitOffset = parseInt(n.bitOffset,10);
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

		this.on("input", function(msg) {
			var _object = [];
			var str = msg.topic;
			var n = str.indexOf(".");
			if (n > -1) {
				str = str.slice(n + 1);
			}
			if (/^([0-9]|1[0-5])$/.test(str)) {
				var _bitPosition = parseInt(str, 10);
				var _bitValue = msg.payload ? 1 : 0;
				var _payload_Word = [];
				var _payload_Bit = [];
				var _wordOffset = wordOffset;
				if ((_bitPosition + bitOffset) > 15){
					_wordOffset = _wordOffset + 1;
					_bitPosition = (_bitPosition + bitOffset) - 15;
				} else {
					_bitPosition = _bitPosition + bitOffset;
				}
				// get the context value
				var _data = context.get("data") || [];
				// clear the right bit in the output payload
				_data[_wordOffset] = _data[_wordOffset] & ~(1 << _bitPosition);
				// copy the receive bit in the output payload
				_data[_wordOffset] = _data[_wordOffset] | (_bitValue << _bitPosition);
				// store the context value back
				context.set("data", _data);
				_payload_Word = _data;
				
				
				_wordOffset = wordOffset;
				var _mask = 0x0001 << bitOffset;
				for (var i = 0; i < 16; i++) {
					if ((_mask > 0x8000) || (_mask === 0x0000)) {
						_wordOffset = _wordOffset + 1;
						_mask = 0x0001;
					}
					// Test the input payload & _mask and set corresponding payload
					_payload_Bit[i] = ((_data[_wordOffset] & _mask) ? true : false);
					// shift the mask to select the next bit
					_mask = _mask << 1;
				}
				
				_object[0] = {topic:topic,payload:_payload_Bit};
				_object[1] = {topic:topic,payload:_payload_Word};
				node.send([_object[0], _object[1]]);
			} else {
				node.error("invalid msg topic (must be number between 0 and 15): " + str);
			}
		});
		node.status({fill: "green",shape: "ring", text: "16 digital outputs"});
	}
	RED.nodes.registerType("Digital Output v2",digitalOutput);
};

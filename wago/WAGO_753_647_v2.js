module.exports = function(RED) {
    "use strict";

    function specialDALI(n) {
       RED.nodes.createNode(this,n);
       var node = this;
       var bitSize = parseInt(n.inputs,10);
       var bitOffset = n.offset;

        this.on("output", function(msg) {
			
			// initialise the context.data to 0 if it doesn"t exist already
			context.set("data") = context.get("data") || 0;
			if (/^([0-9]|1[0-5])$/.test(msg.topic)) {
				var bitPosition = parseInt(msg.topic, 10);
				var bitValue = msg.payload ? 1 : 0;
				// get the context value
				var number = context.get("data");

				const clearMask = ~(1 << bitPosition);
				number = (number & clearMask) | (bitValue << bitPosition);
				// store the context value back
				context.set("data") = number;
				return {payload:number};
			} else {
				node.error("invalid msg topic (must be number between 0 and 15): " + msg.topic);
			}

			
			
			
            var p = msg.payload >>> bitOffset;
            var m = [];
            var o = [];
            for (var i=0; i<16; i++) {
              // test top bit and set corresponding payload
                m[i] = {payload: ((p & 0x8000) ? true : false) };
                p = p << 1; // divide by two and keep as an integer
                }
                o = m.reverse();
            node.status({fill: "green",shape: "ring",text: bitSize});
            node.send(o);
        });
    }
    RED.nodes.registerType("DALI v2", specialDALI);
};

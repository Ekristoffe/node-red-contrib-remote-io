module.exports = function(RED) {
    "use strict";

    function digitalInput(n) {
       RED.nodes.createNode(this,n);
       var node = this;
       var bitSize = parseInt(n.outputs);
       var bitOffset = n.offset;
       var topic = n.topic;
       var outputMsg = {};

        this.on('input', function(msg) {
            var p = msg.payload >>> bitOffset;
            var m = [];
            var o = [];
            for (var i=0; i<16; i++) {
              // test top bit and set corresponding payload
                m[i] = {payload: ((p & 0x8000) ? true : false) };
                p = p << 1; // divide by two and keep as an integer
                }
                o = m.reverse();
                outputMsg.topic = topic;
                outputMsg.payload = o;
            node.status({fill: "green",shape: "ring",text: bitSize});
            node.send(outputMsg);
        });
    }
    RED.nodes.registerType("Digital Input",digitalInput);
};

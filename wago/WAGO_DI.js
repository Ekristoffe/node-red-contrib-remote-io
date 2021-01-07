module.exports = function(RED) {
    "use strict";

    function digitalInput(config) {
        RED.nodes.createNode(this,config);
        let node = this;
        let bitSize = parseInt(config.outputs, 10);
        let bitOffset = config.offset;

        this.on("input", function(msg) {
            let _payload = msg.payload >>> bitOffset;
            let _bytes = new Array(16);
            let _output = [];

            _bytes.forEach((_bit) => {
                // test top bit and set corresponding payload
                _bit = {payload: ((_payload & 0x8000) ? true : false) };
                _payload = _payload << 1; // divide by two and keep as an integer
            })
            // for (var i=0; i<16; i++) {
            //     // test top bit and set corresponding payload
            //     m[i] = {payload: ((p & 0x8000) ? true : false) };
            //     p = p << 1; // divide by two and keep as an integer
            // }
            _output = _bytes.reverse();
            node.status({fill: "green",shape: "ring",text: bitSize});
            node.send(_output);
        });
    }
    RED.nodes.registerType("Digital Input", digitalInput);
};

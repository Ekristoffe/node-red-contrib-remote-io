module.exports = function(RED) {
    function wago(config) {
        RED.nodes.createNode(this,config);
        let context = this.context();
        let node = this;
        this.on("input", function(msg) {

        let mbOutData = {payload: [0,0,0,0]};
        let mbInData = msg;

        let topic = config.topic;

        let outData = {};

        let testInput = config;
        
        let diagMsg = "Im Waiting";
        
        let statusColor;
        
        let getDataState = context.get("getDataState")||1;
        
        let voltsHold = [];
        let voltsL1 = context.get("voltsL1")||0;
        let voltsL2 = context.get("voltsL2")||0;
        let voltsL3 = context.get("voltsL3")||0;
        
        let ampresHold = [];
        let ampresL1 = context.get("ampresL1")||0;
        let ampresL2 = context.get("ampresL2")||0;
        let ampresL3 = context.get("ampresL3")||0;
        
        let freqHold = [];
        let freqL1 = context.get("freqL1")||0;
        let freqL2 = context.get("freqL2")||0;
        let freqL3 = context.get("freqL3")||0;
        
        
        mbOutData.payload[0] = "0"; // no reg comms and L1 measure
        mbOutData.payload[1] = "2304"; // AC line measurement
            
            switch(getDataState) {
                case 1: //voltage
                mbOutData.payload[2] = "1284"; // requests volts for L1 and L2
                mbOutData.payload[3] = "6"; // requests volts for L3
                statusColor = "green";
                break;
                case 2: // current 
                mbOutData.payload[2] = "513"; // requests ampres for L1 and L2
                mbOutData.payload[3] = "3" ; // requests ampres for L3
                statusColor = "green";
                break;
                case 3: //frequency
                mbOutData.payload[2] = "4368"; // requests frequency for L1 and L2
                mbOutData.payload[3] = "18" ; // requests frequency for L3
                statusColor = "green";
                break;
                case 4: // wattage
                break;
            }
            // voltage
            if ((mbInData.payload[2] === "1284") && (mbInData.payload[3] === "6"))  {
                diagMsg = {payload: "getting voltage"};
                voltsHold[0] = parseInt(mbInData.payload[4] + (mbInData.payload[5] << 8), 10);
                voltsHold[1] = parseInt(mbInData.payload[6] + (mbInData.payload[7] << 8), 10);
                voltsHold[2] = parseInt(mbInData.payload[8] + (mbInData.payload[9] << 8), 10);
                voltsL1 = {value: voltsHold[0].toString() / 100};
                voltsL2 = {value: voltsHold[1].toString() / 100};
                voltsL3 = {value: voltsHold[2].toString() / 100};
                context.set("voltsL1", voltsL1);
                context.set("voltsL2", voltsL2);
                context.set("voltsL3", voltsL3);
                getDataState = 2;
            }
            // current 
            if ((mbInData.payload[2] === "513") && (mbInData.payload[3] === "3"))  {
                diagMsg = {payload: "getting current"};
                ampresHold[0] = parseInt(mbInData.payload[4] + (mbInData.payload[5] << 8), 10);
                ampresHold[1] = parseInt(mbInData.payload[6] + (mbInData.payload[7] << 8), 10);
                ampresHold[2] = parseInt(mbInData.payload[8] + (mbInData.payload[9] << 8), 10);
                ampresL1 = {value: ampresHold[0].toString() / 1000};
                ampresL2 = {value: ampresHold[1].toString() / 1000};
                ampresL3 = {value: ampresHold[2].toString() / 1000};
                context.set("ampresL1", ampresL1);
                context.set("ampresL2", ampresL2);
                context.set("ampresL3", ampresL3);
                getDataState = 3;
            }
            // frequency
            if ((mbInData.payload[2] === "4368") && (mbInData.payload[3] === "18"))  {
                diagMsg = {payload: "getting frequency"};
                freqHold[0] = parseInt(mbInData.payload[4] + (mbInData.payload[5] << 8), 10);
                freqHold[1] = parseInt(mbInData.payload[6] + (mbInData.payload[7] << 8), 10);
                freqHold[2] = parseInt(mbInData.payload[8] + (mbInData.payload[9] << 8), 10);
                freqL1 = {value: freqHold[0].toString() / 1000};
                freqL2 = {value: freqHold[1].toString() / 1000};
                freqL3 = {value: freqHold[2].toString() / 1000};
                context.set("freqL1", freqL1);
                context.set("freqL2", freqL2);
                context.set("freqL3", freqL3);
                getDataState = 1;
    }
        node.status({fill: statusColor,shape: "ring",text: diagMsg.payload});
        context.set("getDataState", getDataState);

        outData.topic = topic;
        outData.payload = {L1: {voltage: voltsL1.value, current: ampresL1.value, frequency: freqL1.value}, L2: {voltage: voltsL2.value, current: ampresL2.value, frequency: freqL2.value}, L3: {voltage: voltsL3.value, current: ampresL3.value, frequency: freqL3.value}};
        node.send([mbOutData, outData]);

        });
    }
    RED.nodes.registerType("Power Measurement",wago);
};


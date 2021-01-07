# Node-RED contrib Remote IO

[![NPM](https://nodei.co/npm/node-red-contrib-remote-io.png)](https://nodei.co/npm/node-red-contrib-remote-io/)

Remote IO nodes make it simple to receive and send data in/out of Modbus registers.
Scaling functions and diagnostics are built in when available.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT 
	NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. 
	IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, 
	WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE 
	SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

## Getting Started
[Adding nodes to the palette](https://nodered.org/docs/user-guide/runtime/adding-nodes) - Node-RED Documentation

## Documentation
### - Typical pitfall
With 750-3xx, 750-8xx, 750-9xx or 750-8xxx
You dial with a WAGO Ethernet controller.
Try to set outputs - but nothing happens!
WAGO Ethernet controller provide a "owner" policy for physical outputs.
The "owner" could be CoDeSys-Runtime or Fieldbus-Master.
Every time you download a PLC program the CoDeSys-Runtime becomes "owner" of physical outputs.
Use tool "WAGO Ethernet Settings" and do "Reset File System",
it is the easiest way to assign Modbus-Master as "owner".
Alternatively you can "Login" with CoDeSys-IDE and perform "Reset(original)".

With 750-8xxx
By default there is no Modbus server available, you must create your own Modbus server by using:
*   759-911: WAGO-I/O-PRO-CAA (CoDeSys 2.3)
*   2759-101: e!Cockpit
*   [KbusModbusSlave (Official)](https://github.com/WAGO/pfc-howtos/tree/master/HowTo_AddKbusModbusSlave)
*   [KbusModbusSlave (Development/Experimental)](https://github.com/Ekristoffe/HowTo_AddKbusModbusSlave)

## Project Informations
[![Platform Node-RED](https://img.shields.io/badge/Platform-Node--RED-red)](https://nodered.org/)

### - Current version
[![GitHub package.json version](https://img.shields.io/github/package-json/v/ekristoffe/node-red-contrib-remote-io)](https://www.npmjs.com/package/node-red-contrib-remote-io)  
[![NPM download](https://img.shields.io/npm/dm/node-red-contrib-remote-io.svg)](https://npm-stat.com/?package=node-red-contrib-remote-io)  
[![NPM download](https://img.shields.io/npm/dw/node-red-contrib-remote-io.svg)](https://npm-stat.com/?package=node-red-contrib-remote-io)

### - Languages
[![GitHub language count](https://img.shields.io/github/languages/count/ekristoffe/node-red-contrib-remote-io)](README.md)  
[![GitHub top language](https://img.shields.io/github/languages/top/ekristoffe/node-red-contrib-remote-io)](README.md)

### - License
[![GitHub](https://img.shields.io/github/license/ekristoffe/node-red-contrib-remote-io)](https://github.com/ekristoffe/node-red-contrib-remote-io/blob/master/LICENSE) 

### - Release Note
*   1.0.1 First release  
*   1.0.2 package.json updated  
*   1.0.3 Readme and package.json updated  
*   1.0.4 Readme and package.json updated  
*   1.0.5 Readme and package.json updated  
*   1.0.6 Nodes color change + package.json updated  
*   1.0.7 Readme and package.json updated  
*   1.0.8 Temperature status added and package.json updated  
*   2.0.0 Analog output fixed to fload + Nodes color change + New icons + package.json updated  
*   2.0.1 License change from GNU to MIT + Nodes color change + New icons + Readme and package.json updated  
*   0.1.3 License change from GNU to MIT + Nodes color change + New icons + Readme and package.json updated  
*   3.0.0 Update "Power Measurement" node outputs + remove unused graphics  
*   3.0.1 Update "Power Measurement" node outputs  
*   3.0.2 Update "Power Measurement" node html  
*   3.0.3 Readme updated + DI and DO icons reversed  
*   3.0.4 Readme updated  
*   3.0.5 Readme updated  
*   3.0.6 Readme updated  
*   3.0.7 Readme updated  
*   @next New icons + Readme and package.json updated

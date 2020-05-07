var SerialPort = require('serialport')

var portName = 'COM4';//定义串口名

var port = new SerialPort("COM4",{
    baudRate: 9600,//波特率
    dataBits: 8,//数据位,
    parity: "none",//奇偶校验,
    stopBits: 1,//停止位,
    flowControl : false
},false);

port.open((error)=>{
    if(error){
        console.log("打开端口"+portName+"错误："+error);
        
    }else{
        console.log("打开端口成功,正在监听数据中");
        SerialPort.open('data',(data)=>{
            console.log(data)
        })
    }
});

/**
 * http://www.qihuawu.com/serial-data-obtained-using-nodejs.html
 * 
 * 
 * https://segmentfault.com/q/1010000014342218
 */
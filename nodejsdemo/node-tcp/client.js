/**
 * 创建TCP客户端
 */
var net = require('net');
var HOST = 'localhost';
var PORT = 6666;

var client = new net.Socket();

client.connect(PORT,HOST,()=>{
    console.log('CONNECTED TO:'+HOST+':'+PORT);
    //建立连接后立即向服务器发送数据，服务器将收到这些数据
    client.write("I am Iron Man!");
});

//为客户端添加"data"事件处理函数
//data是服务器发回的数据
client.on('data',(data)=>{
    console.log('DATA:'+data);
    //完全关闭连接
    client.destroy();
});
//为客户端添加"close 事件处理函数
client.on('close',()=>{
    console.log('Connection closed');
})

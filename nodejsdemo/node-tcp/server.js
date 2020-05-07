/**
 * 创建TCP服务器
 */
var net = require('net');
var HOST = 'localhost';
var PORT = 6666;

// 创建一个TCP服务器实例，调用listen函数开始监听指定端口
// 传入net.createServer()的回调函数将作为”connection“事件的处理函数
// 在每一个“connection”事件中，该回调函数接收到的socket对象是唯一的

net.createServer((socket)=>{
    //我们获得一个连接，该连接自动关联一个socket对象
    console.log('CONNECTED:'+socket.remoteAddress+':'+socket.remotePort);
    //为这个socket实例添加一个data事件 
    socket.on("data",(data)=>{
        console.log('DATA:'+socket.remoteAddress+':'+data);
        //回发该数据，客户端将收到来自服务端的数据
        socket.write('You said "'+data+'"');
    })

    //为这个socket实例添加一个"close"事件处理函数
    socket.on('close',(data)=>{
        console.log('CLOSE:'+socket.remoteAddress+' '+socket.remotePort);
    })
}).listen(PORT,HOST);

console.log('Server listening on '+HOST+':'+PORT);

//另外一种稍不不同的方式接受TCP连接，即显示处理"connection""事件

// var net = require('net')
// var HOST = 'localhost';
// var PORT = 6666;
// var server = net.createServer();

// server.listen(PORT,HOST);

// console.log('Server listening on '+server.address().address+':'+server.address().port);

// server.on('connection',(socket)=>{
//     console.log('CONNECTED:'+socket.remoteAddress+':'+socket.remotePort);
//     socket.on('data',(err,data)=>{
//         if(err){
//             console.log(err);
//         }
//         console.log('DATA'+socket.remoteAddress+': '+data);
//         socket.write('You said "'+data+'"');
//     })
//     socket.on('close',(err,data)=>{
//         if(err){
//             console.log(err);
//         }
//         console.log('CLOSED:'+socket.remoteAddress+' '+ socket.remotePort);
//     })
// })
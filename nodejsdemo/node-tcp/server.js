/**
 * 创建TCP服务器
 * 
 * port：客户端应连接到的端口。此选项是必需的。
 * host：客户端应该连接到的服务器的域名或IP地址。默认为localhost
 * localAddress：客户端应该绑定的用于网络连接的本地IP地址。
 * allowHalfOpen：一个布尔值，如果为true，则表示当套接字的另一端发送一个FIN数据包时，该套接字将不会自动发送一个FIN数据包，从而使Duplex流的一半保持开放。默认为false
 * 
 * 3. 一旦Socket对象被创建，它就提供了在连接到服务器的生命周期中发出的几个事件，如下：
 * connect：成功建立与服务器的连接时发出。回调函数不接受任何参数
 * data：在套接字上收到数据时发出。如果没有数据时间处理程序被连接，那么数据可能会丢失。回调函数必须接受一个buffer对象作为参数，它包含从套接字读取的数据的块。
 * end：当服务器通过发送一个FIN终止连接时发出。回调函数不接受任何参数
 * timeout：由于不活动，因此到服务器的连接超时时发出。
 * drain：当写缓冲区变为空时发出。你可以使用此事件截回被写入套接字中的数据流。回调函数不接受任何参数
 * error：在套接字连接上发生错误时发出。回调函数应该接受错误的唯一参数。
 * close：套接字已完全关闭时发出，它可能是由一个end（）方法关闭的，或者因为发生错误而关闭。回调函数不接受任何参数
 * 
 * bufferSize   当前已缓冲并等待写入套接字的流中的字节数
 * remoteAddress   套接字连接到的远程服务器的IP地址
 * remotePort    套接字连接到的远程服务器的端口
 * localAddress   远程客户端用于套接字连接的本地IP地址
 * localPort     远程客户端用于套接字连接的本地端口
 * byteRead     由套接字读取的字节数
 * byteWritten    由套接字写入的字节数
 * 
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
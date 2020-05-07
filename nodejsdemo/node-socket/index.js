/**
 * Express初始化app为可以提供给HTTP服务器的函数处理程序（如第2行所示）。
 * 我们定义了一个路由处理程序/，当我们访问我们的网站主页时会被调用。
 * 我们使http服务器在端口3000上侦听。
 */
var app = require('express')();

var http = require('http').createServer(app)

var io = require('socket.io')(http);

app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/index.html');
})


io.on('connection',(socket)=>{
    console.log('a user connected~~');
    //每个套接字还引发一个特殊disconnect事件：
    socket.on('disconnect',()=>{//当网页关闭的时候
        console.log('user disconnected')
    })
    //客户端向服务端发
    socket.on('chat message',(msg)=>{
        console.log('message: '+msg);
        //在这种情况下，会将消息发送给所有人，包括发件人。
        io.emit('chat message',msg);
    })
     //服务端向客户端发
     //如果您想向除某个发射套接字之外的所有人发送消息，我们具有broadcast从该套接字发射的标志：
     socket.broadcast.emit('hi');
})

//这会将事件发送到所有连接的套接字
io.emit('some event',{
    someProperty: 'some value',
    otherProperty: 'other value'
})

http.listen(3000,()=>{
    console.log('listening on * : 3000');
})
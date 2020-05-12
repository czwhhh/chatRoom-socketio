/**
 * Express初始化app为可以提供给HTTP服务器的函数处理程序（如第2行所示）。
 * 我们定义了一个路由处理程序/，当我们访问我们的网站主页时会被调用。
 * 我们使http服务器在端口3000上侦听。
 */
var app = require('express')();//相当于创建了express的实例没有那个()就得重新加一行var app = express()

var server = require('http').createServer(app)//创建一个http服务器


//var io = require('socket.io').listen(server);
var io = require('socket.io')(server,{
    // path:'/myownpath',
    // serveClient:false,
    // pingInterval:10000,
    // pingTimeout:5000,
    // cookie:false
    //等价于
    // var Server = require('socket.io')
    // var io = new Server();
});
//服务器在本机或者某个网内监听本机或者某个网内其他的客户端请求连接的端口
server.listen(3000,'192.168.43.79',()=>{
    var host = server.address().address;
    var port = server.address().port;
    console.log('listening on * : 3000');
})
var name = null;
app.get('/chatWithMe',(req,res)=>{
    //获得get请求参数
    name = req.query.name //用户输入网页的时候写的用户名
    console.log('用户名为'+name+'的用户进来了~~')
    res.sendFile(__dirname+'/index.html');
    // res.send({username : name});
})

io.on('connection',(socket)=>{//监听连接后进行的处理
    //控制台打印
    console.log('a user connected~~');
    //将这个socket用户连接上的信息通过 con事件 广播给其他socket连接
    socket.broadcast.emit('con',{
        msg : 'hi,有一个叫'+name+'的人进去了网页聊天室~'
    }); 
    //每个套接字还可以引发一个特殊disconnect事件：
    socket.on('disconnect',()=>{//当网页关闭的时候
        //将这个socket用户断开的信息 通过con事件 传递给其他socket客户端,不包括自己
        socket.broadcast.emit('con',{
            msg : name+'离开了聊天室'
        });
        console.log(name+'断开连接了~~')
    })

    //以下代码主要包括两件事，一个是向前端发送news的事件，一个是监听news事件
    socket.on('news',(message)=>{//监听chat事件
        console.log('服务端收到'+name+'客户端的message消息: '+message);  
        // 在这种情况下，会将消息发送给所有人，包括发件人。
        io.emit('news',{
            msg : name+':'+message
        })
    })
})



//这会将事件发送到所有连接的套接字
io.emit('some event',{
    someProperty: 'some value',
    otherProperty: 'other value'
})




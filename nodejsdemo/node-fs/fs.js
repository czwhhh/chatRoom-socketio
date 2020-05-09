/**
 * fs模块小demo
 * 参考博客：https://www.jianshu.com/p/5683c8a93511
 * 
 */
//公共引用
const fs = require('fs');
const path = require('path');

/**
 * 1.读取文件readFile函数
 * readFile(filename,[options],callback);
 * filename, 必选参数，文件名
 * [options],可选参数，可指定flag（文件操作选项，如r+ 读；w+ 写，文件不存在则创建）及encoding属性
 * callback 读取文件后的回调函数，参数默认第一个err,第二个data 数据
 */
fs.readFile(__dirname+'/demo.txt',{flag:'r+',encoding:'utf8'},(err,data)=>{
    if(err){
        console.error(err);
        return;
    }
    console.log("从demo.txt中读到的内容：\n"+data)
})
/**
 * 2.将内容写进文件里
 * fs.writeFile(filename,data,[options],callback);
 * filename, 必选参数，文件名
 * data, 写入的数据，可以字符或一个Buffer对象
 * [options],flag,mode(权限),encoding
 * callback 读取文件后的回调函数，参数默认第一个err,第二个data 数据
 */
// var w_data = '这是一段通过fs.writeFile函数写入的内容;\r\n';
// var w_data = new Buffer(w_data);
// fs.writeFile(__dirname+'/demo.txt',w_data,{flag:'w+',encoding:'utf8'},(err)=>{
//     if(err){
//         console.error(err);
//         return;
//     }
//     console.log("写入文件成功");    
// })
//如果要做到要进行写入内容再读取可以用以下方式
// var w_data = '这是一段通过fs.writeFile函数写入的内容;\r\n';
// var w_data = new Buffer(w_data);
// fs.writeFile(__dirname+'/demo.txt',w_data,{flag:'w+',encoding:'utf8'},(err)=>{
//     if(err){
//         console.error(err);
//         return;
//     }
//     console.log("写入文件成功");  
//     fs.readFile(__dirname+'/demo.txt',{flag:'r+',encoding:'utf8'},(err,data)=>{
//         if(err){
//             console.error(err);
//             return;
//         }
//         console.log("从demo.txt中读到的内容："+data)
//     })  
// })

/**
 * 3.以追加方式写文件
 * fs.appendFile(filename,data,[options],callback);
 */
// var append_ = '使用fs.appendFile追加文件内容;\r\n';
// var append_ = new Buffer(append_);
// fs.appendFile(__dirname+'/demo.txt',append_,()=>{
//     console.log('追加内容完成')
// })

/**
 * 4.打开文件
 * fs.open(filename, flags, [mode], callback);
 * filename, 必选参数，文件名
 * flags, 操作标识，如"r",读方式打开
 * [mode],权限，如777，表示任何用户读写可执行
 * callback 打开文件后回调函数，参数默认第一个err,第二个fd为一个整数，表示打开文件返回的文件描述符，window中又称文件句柄
 */
fs.open(__dirname+'/demo.txt','r','0666',(err,fd)=>{
    console.log(fd);
})

/**
 * 5.读文件，读取打开的文件内容到缓冲区
 * fs.read(fd, buffer, offset, length, position, callback);
 * fd, 使用fs.open打开成功后返回的文件描述符
 * buffer, 一个Buffer对象，v8引擎分配的一段内存
 * offset, 整数，向缓存区中写入时的初始位置，以字节为单位
 * length, 整数，读取文件的长度
 * position, 整数，读取文件初始位置；文件大小以字节为单位
 * callback(err, bytesRead, buffer), 读取执行完成后回调函数，bytesRead实际读取字节数，被读取的缓存区对象
 */

// fs.open(__dirname+'/demo.txt','r',(err,fd)=>{
//     if(err){
//         console.error(err);
//         return;
//     }else{
//         var buffer = new Buffer(255);
//         console.log(buffer.length);
//         //每一个汉字utf8编码是3个字节，英文是1个字节
//         fs.read(fd,buffer,0,9,0,(err,bytesRead,buffer)=>{
//             if(err){
//                 throw err;
//             }else{
//                 console.log(bytesRead);
//                 console.log(buffer.slice(0,bytesRead).toString());
//                 //读取完后，在使用fd读取时，基点时基于上次读取位置计算;
//                 fs.read(fd,buffer,0,9,9,(err,bytesRead,buffer)=>{
//                     console.log(bytesRead);
//                     console.log(buffer.slice(0,bytesRead).toString());
//                 })
//             }
//         })
//     }
// })

/**
 * 6.写文件，将缓冲区内的数据写入使用fs.open打开的文件
 * fs.write(fd, buffer, offset, length, position, callback);
 * fd, 使用fs.open打开成功后返回的文件描述符
 * buffer, 一个Buffer对象，v8引擎分配的一段内存
 * offset, 整数，从缓存区中读取时的初始位置，以字节为单位
 * length, 整数，从缓存区中读取数据的字节数
 * position, 整数，写入文件初始位置；
 * callback(err, written, buffer), 写入操作执行完成后回调函数，written实际写入字节数，buffer被读取的缓存区对象
 * 
 */
// fs.open(__dirname+'/demo.txt','a',(err,fd)=>{
//     if(err){
//         console.error(err);
//         return;
//     }else{
//         var buffer = new Buffer('写入文件数据内容');
//         //写入 入文件  这三个字
//         fs.write(fd,buffer,3,9,12,(err,written,buffer)=>{
//             if(err){
//                 console.log('写入文件失败');
//                 console.error(err);
//                 return;
//             }else{
//                 console.log(buffer.toString());
//                 //写入  数据内  三个字
//                 fs.write(fd,buffer,12,9,null,(err,written,buffer)=>{
//                     console.log(buffer.toString());
//                 })
//             }
//         })
//     }
// })


/**
 * fs.fsync(fd, [callback])
 * 使用fs.write写入文件时，操作系统是将数据读到内存，再把数据写入到文件中，当数据读完时并不代表数据已经写完，因为有一部分还可能在内在缓冲区内。
 * 因此可以使用fs.fsync方法将内存中数据写入文件；--刷新内存缓冲区；
 * fd, 使用fs.open打开成功后返回的文件描述符
 * [callback(err, written, buffer)], 写入操作执行完成后回调函数，written实际写入字节数，buffer被读取的缓存区对象
 */

fs.open(__dirname + '/demo.txt', 'a', function (err, fd) {
    if(err)
      throw err;
    var buffer = new Buffer('我爱nodejs编程');
    fs.write(fd, buffer, 0, 9, 0, function (err, written, buffer) {
      console.log(written.toString());
      fs.write(fd, buffer, 9, buffer.length - 9, null, function (err, written) {
        console.log(written.toString());
        fs.fsync(fd,()=>{});
        fs.close(fd,()=>{});
      })
    });
  });
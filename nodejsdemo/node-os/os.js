/**
 * Node.js  的os模块
 * OS 模块可以查看当前主机系统的相关信息，如网络，CPU，内存，目录，用户信息，操作系统，运行时间等
 * 主要 APIs：
 * os.uptime() 系统运行时间
 * os.userInfo() 系统用户信息
 * os.platform() 操作系统平台
 * os.hostname() 主机名称
 * os.release() 发行版本
 * os.type() 系统类型，例如返回值是 linux 是 Linux 系统，Darwin 是 macOS 系统，Windows_NT 是 Windows 系统
 * os.arch() CPU 结构信息
 * os.EOL 换行符，\n 是 POSIX，\r\n 是 Windows
 * os.endianness() 字节次序，BF 是大端，LF 是小端
 * os.loadavg() 平均负载
 * os.networkInterfaces() 网络信息，可以查看 IP 地址、掩码、物理地址等信息
 * os.freemem() 可用内存
 * os.totalmem() 总内存
 * os.homedir() HOME目录
 * os.tmpdir() TMP目录
 * os.cpus() CPU信息
 * os.constants 操作系统常量，可以获取系统的 SIGNAL、ERRORNO 和 LIBUV 常量的相关信息
 */


 const os = require('os');
 const G = 1024 * 1024 * 1024;
 //系统
 const system = {
     uptime:os.uptime(),
     platform:os.platform(),
     hostname:os.hostname(),
     release:os.release(),
     type:os.type(),
     arch:os.arch(),
     eol:os.eol,//换行符
     endianness:os.endianness(),//字节次序
     loadavg:os.loadavg(),//平均负载
     networkInterfaces:os.networkInterfaces()//网络
 }
//内存
 const memory = {
     freemem:os.freemem(),
     totalmem:os.totalmem()
 }
//文件
 const dir = {
     homedir:os.homedir(),
     tmpdir:os.tmpdir()
 }
//cpu
const cpus = os.cpus();
//用户信息
const userInfo = os.userInfo();
//操作系统常量
const constants = os.constants;

console.log('系统版本：%s %s %s', system.type, system.release, system.arch);
console.log('主机名称：%s', system.hostname);
console.log('开机时长：%sh', (system.uptime/3600).toFixed(1));
console.log('总内存：%s', `${(memory.totalmem/G).toFixed(2)}G`);
console.log('可用内存：%s', `${(memory.freemem/G).toFixed(2)}G`);
console.log('HOME目录：%s', dir.homedir);
console.log('TEMP目录：%s', dir.tmpdir);
console.log('CPU：%s %s核处理器', cpus[0].model, cpus.length);
console.log(`用户名：${userInfo.username}`);
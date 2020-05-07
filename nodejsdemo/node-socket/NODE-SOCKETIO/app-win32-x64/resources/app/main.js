const electron = require('electron');

const app = electron.app;

const BrowserWindow = electron.BrowserWindow;

let mainWindow = null;

app.on('ready',()=>{
    //创建主进程窗口
    mainWindow = new BrowserWindow({
        width : 800 ,
        height : 900 
    })
    mainWindow.loadURL('http://localhost:3000/');
    mainWindow.on('closed',()=>{
        mainWindow = null;
    })
})

//监听所有窗口关闭
app.on('window-all-closed',()=>{
    if(process.platform != 'darwin'){
        app.quit();
    }
})

app.on('activate',()=>{
    if(mainWindow == null){
        mainWindow = new BrowserWindow({
            width : 800 ,
            height : 900 
        })
    }
})


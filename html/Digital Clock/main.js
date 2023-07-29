const { app, BrowserWindow } = require('electron');

let win;//ウインドウを入れておく変数

function createWindow() {

    //ウインドウの作成
    win = new BrowserWindow({
        width: 200,
        height: 100,
        transparent: true, // ウィンドウの背景を透過
        frame: false, // 枠の無いウィンドウ
        resizable: false, // ウィンドウのリサイズを禁止
        webPreferences: {
            nodeIntegration: true, //Electron6から必要らしい
            contextIsolation: false, //Security的には良くないらしいが...
        }
    }) 

    //ウインドウに表示する内容
    win.loadFile('index.html');

    //デバッグ画面表示
    // win.webContents.openDevTools();

    //このウインドウが閉じられたときの処理
    win.on('closed', () => {
        win = null;
    })
}

//アプリが初期化されたとき(起動されたとき)
app.on('ready', ()=>{
    createWindow();
})

//全ウインドウが閉じられたとき
app.on('window-all-closed', () => {
    if (ProcessingInstruction.platform !== 'darwin') {
        app.quit();
    }
})

//アクティブになったとき(MacだとDockがクリックされたとき)
app.on('activate', () => {
    if (win === null) {
        createWindow();
    }
})
const electron = require('electron');

const {app, BrowserWindow, Menu, ipcMain} = electron;

let mainWindow, addWindow;

app.on('ready', () =>{
  mainWindow = new  BrowserWindow({});
  mainWindow.loadURL(`file://${__dirname}/app/windows/invertedThreadClocks.html`);
  mainWindow.on('closed', () => app.quit());

});

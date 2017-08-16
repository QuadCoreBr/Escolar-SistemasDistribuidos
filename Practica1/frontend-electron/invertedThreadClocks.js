const electron = require('electron');

const {app, BrowserWindow, Menu, ipcMain} = electron;

let mainWindow, addWindow;

app.on('ready', () =>{
  mainWindow = new  BrowserWindow({});
  mainWindow.loadURL(`file://${__dirname}/windows/invertedThreadClocks.html`);
  mainWindow.on('closed', () => app.quit());

  const mainMenu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(mainMenu);
});


const menuTemplate = [
  {
    label: 'System',
    submenu: [
      {
        label: 'Exit',
        accelerator:(() => {
          if (process.platform === 'darwin') {
            return 'Command+Q'
          }else {
            return 'Ctrl+Q';
          }
        })(),
        click(){
          app.quit();
        }
      }
    ]
  }
];
if(process.env.NODE_ENV !== 'production'){
  menuTemplate.push({
    label: 'Developer',
    submenu: [
      {
        role: 'reload'
      },
      {
        label: 'Toggle Developer Tools',
        accelerator: process.platform === 'darwin' ? 'Command+Alt+I': 'Ctrl+Shift+I',
        click(item,focusedWindow){
          focusedWindow.toggleDevTools();
        }
      }
    ]
  });
}
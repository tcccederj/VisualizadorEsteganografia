const { app, BrowserWindow } = require('electron');
const path = require('path');
const url = require('url');
const fs = require('fs');

let win;

function createWindow() {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true // Permite o uso de módulos do Node.js no lado do renderizador
    }
  });

  win.loadURL(
    url.format({
      pathname: path.join(__dirname, 'dist/visualizador-estenografia/index.html'),
      protocol: 'file:',
      slashes: true
    })
  );

  //win.webContents.openDevTools(); // Abre o console de desenvolvedor do Electron

  win.on('closed', () => {
    win = null;
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (win === null) {
    createWindow();
  }
});

// Configuração para permitir leitura e gravação de arquivos no sistema de arquivos local
app.commandLine.appendSwitch('disable-site-isolation-trials');
app.allowRendererProcessReuse = false;

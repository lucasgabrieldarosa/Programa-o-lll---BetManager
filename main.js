// Inicialização do Electron
const { app, BrowserWindow } = require('electron');
const path = require('path');

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  win.loadFile('./src/public/login.html'); // Carrega o arquivo HTML do login
};

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

// Inicie o servidor aqui
const { spawn } = require('child_process');
const server = spawn('node', ['src/server/server.js']);

server.stdout.on('data', (data) => {
  console.log(`Servidor: ${data}`);
});

server.stderr.on('data', (data) => {
  console.error(`Erro do servidor: ${data}`);
});

server.on('close', (code) => {
  console.log(`Servidor encerrado com código ${code}`);
});

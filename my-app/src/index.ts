import { app, BrowserWindow, ipcMain } from 'electron';
import Usuario from '../entity/Usuario';
import UsuarioRepository from '../repository/UsuarioRepository'
import InsumosRepository from '../repository/InsumosRepository'
import { compare, hash } from 'bcrypt';
import Insumos from '../entity/Insumos';


declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;


if (require('electron-squirrel-startup')) {
  app.quit();
}

let mainWindow : BrowserWindow 


const createWindow = (): void => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    height: 600,
    width: 800,
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
    },
  });

  // and load the index.html of the app.
  mainWindow.loadURL('http://localhost:3000/login');

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});


//functions user
ipcMain.handle("create", async (event:any, usuario: any) => {
  console.log(usuario);
  const {nome, cpf, email_cadastro, password} = usuario;
  const passwordHasheado = await hash(password, 10);
  const novoUsuario = new Usuario(nome, cpf, email_cadastro, passwordHasheado);
  new UsuarioRepository().save(novoUsuario);

})

ipcMain.handle('verify', async (_: any, email: string) => {
  return await new UsuarioRepository().verificarCadastroExistente(email);
})

ipcMain.handle('searchByEmail', async (_: any, email: string) => {
  return await new UsuarioRepository().acharConta(email);
})

ipcMain.handle('hash_password', async (_:any, credenciais: any) => {
  const {senha, password_hash} = credenciais
  console.log(credenciais.senha)
  return await compare(senha, password_hash);
})
//---------



//functions insumos
ipcMain.handle('insumoExiste', async(_: any, nome: string) =>{
  return await new InsumosRepository().verificarInsumoCadastrado(nome)
})


ipcMain.handle('saveInsumo',async (_: any, insumo: any) => {
  console.log(insumo);
  const {nome_insumo, quantidade, preco_unitario} = insumo;
  const novoInsumo = new Insumos(nome_insumo, quantidade, preco_unitario);
  new InsumosRepository().save(novoInsumo);
})

ipcMain.handle('buscarInsumos', async() =>{
  return await new InsumosRepository().trazerInsumos()
})


















//navigation
ipcMain.on('ir-manutencao', () =>{
  mainWindow.loadURL('http://localhost:3000/manutencao')
})

ipcMain.on('ir-producao', () =>{
  mainWindow.loadURL('http://localhost:3000/producao')
})

ipcMain.on('ir-insumo', () =>{
  mainWindow.loadURL('http://localhost:3000/insumo')
})

ipcMain.on('vai-home', () =>{
  mainWindow.loadURL('http://localhost:3000/home')
})


ipcMain.on('vai-cadastro', () =>{
  mainWindow.loadURL('http://localhost:3000/cadastro')
})


ipcMain.on('vai-login', () =>{
  mainWindow.loadURL('http://localhost:3000/login')
})

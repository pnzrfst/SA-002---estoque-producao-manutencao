import { app, BrowserWindow, ipcMain } from 'electron';
import Usuario from '../entity/Usuario';
import UsuarioRepository from '../repository/UsuarioRepository'
import InsumosRepository from '../repository/InsumosRepository'
import VeiculoRepository from '../repository/VeiculoRepository'
import Insumo_por_veiculoRepository from '../repository/Insumo_por_veiculoRepository'
import { compare, hash } from 'bcrypt';
import Insumos from '../entity/Insumos';
import Veiculo from '../entity/Veiculo';
import Insumo_por_veiculo from '../entity/Insumo_por_veiculo';
import Manutencao from '../entity/Manutencao';
import ManutencaoRepository from "../repository/ManutencaoRepository"


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
  return new UsuarioRepository().save(novoUsuario);

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
  await new InsumosRepository().save(novoInsumo);
})

ipcMain.handle('buscarInsumos', async() =>{
  return await new InsumosRepository().trazerInsumos()
})


ipcMain.handle('trazerId', async (_:any, id: string) => {
  return await new InsumosRepository().trazerInsumoPorId(id)
})

ipcMain.handle('trazerPorNome', async (_:any, nome: string) => {
  return await new InsumosRepository().trazerInsumoPorNome(nome)
})


ipcMain.handle('descontarInsumo', async(_: any, id: string, quantidade: number) =>{
  return await new InsumosRepository().descontarInsumo(id, quantidade)
})


ipcMain.handle('atualizarInsumo', async(_: any, insumo: any, id: string) =>{
  const {nome_insumo, quantidade, preco_unitario,} = insumo;
  console.log('chegou:', { nome_insumo, quantidade, preco_unitario}, id);
  const insumoAtualizado = new InsumosRepository().atualizarInsumo(nome_insumo, quantidade, preco_unitario, id)
  return insumoAtualizado
})

ipcMain.handle('apagarInsumo', (_: any, id: string) =>{
  console.log('id recebido:', id)
  return new InsumosRepository().apagarInsumo(id)
})

//------------------------------------------------------


//functions veiculos

ipcMain.handle('createVeiculo', async(_: any, veiculo: any) =>{
  const {chassi,  modelo, cor} = veiculo;
  const novoVeiculo = new Veiculo(chassi,  modelo, cor);
  const veiculoCadastrado = await new VeiculoRepository().save(novoVeiculo);
  return veiculoCadastrado
})

ipcMain.handle('trazerVeiculos', async() =>{
  return await new VeiculoRepository().trazerVeiculos()
})

ipcMain.handle('trazerVeiculoPorId', async (_:any, id: string) => {
  return await new VeiculoRepository().trazerVeiculoPorId(id)
})

//------------------------------------

//functions insumo_por_veiculo
ipcMain.handle('cadastrar', async(_: any, associarInsumoVeiculo: any) =>{
  console.log(associarInsumoVeiculo);
  const {fk_veiculo, fk_insumo, quantidade} = associarInsumoVeiculo;
  const novaAssociacao = new Insumo_por_veiculo(fk_veiculo, fk_insumo, quantidade)
  await new Insumo_por_veiculoRepository().save(novaAssociacao);
})


//functions manutencao


ipcMain.handle('cadastrarManutencao', async(_: any, manutencao: any) =>{
  console.log(manutencao);
  const {descricao, valor, fk_veiculo} = manutencao;
  const novaManutencao = new Manutencao(descricao, valor, fk_veiculo)
  const manutencaoCadastrada = await new ManutencaoRepository().save(novaManutencao);
  console.log(`manutencao cadastrada: ${manutencaoCadastrada}`)
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

import {contextBridge, ipcRenderer } from "electron";
import Usuario from "../entity/Usuario";
import Insumos from "../entity/Insumos";

contextBridge.exposeInMainWorld("userApi", {
    cadastrarUser: async(usuario : Usuario) => await ipcRenderer.invoke("create", usuario),
    verificarUserCadastrado: async(email: string) => await ipcRenderer.invoke("verify", email),
    acharContaUser : async(email: string) => await ipcRenderer.invoke("searchByEmail", email),
})

contextBridge.exposeInMainWorld("insumoApi", {
    verificarInsumoCadastrado: async(nome: string) => await ipcRenderer.invoke("insumoExiste", nome),
    salvarInsumo: async(insumo: Insumos) => await ipcRenderer.invoke('saveInsumo', insumo),
    trazerInsumos: async() => await ipcRenderer.invoke('buscarInsumos'),
    trazerInsumoPorId: async(id: string) => await ipcRenderer.invoke('trazerId', id),
    atualizarInsumo: async(insumo: any) => await ipcRenderer.invoke('atualizarInsumo', insumo)
})


contextBridge.exposeInMainWorld("navigationApi", {
    irCadastro: () => ipcRenderer.send('vai-cadastro'),
    voltarLogin: () => ipcRenderer.send('vai-login'),
    irHome: () => ipcRenderer.send('vai-home'),
    irProducao: () => ipcRenderer.send('ir-producao'),
    irManutencao: () => ipcRenderer.send('ir-manutencao'),
    irInsumos: () => ipcRenderer.send('ir-insumo')
})

contextBridge.exposeInMainWorld("authApi", {
    hash: async(credenciais: any)  => await ipcRenderer.invoke("hash_password", credenciais)
})
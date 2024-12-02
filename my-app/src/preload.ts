import {contextBridge, ipcRenderer } from "electron";
import Usuario from "../entity/Usuario";
import Insumos from "../entity/Insumos";
import Veiculo from "../entity/Veiculo"

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
    trazerInsumoPorNome: async(nome: string) => await ipcRenderer.invoke('trazerPorNome', nome),
    atualizarInsumo: async(insumo: any, id: string) => await ipcRenderer.invoke('atualizarInsumo', insumo, id),
    descontarInsumo: async(id: string, quantidade: number) => await ipcRenderer.invoke('descontarInsumo', id, quantidade),
    apagarInsumo: async(id: string) => await ipcRenderer.invoke('apagarInsumo', id)
})


contextBridge.exposeInMainWorld("navigationApi", {
    irCadastro: () => ipcRenderer.send('vai-cadastro'),
    voltarLogin: () => ipcRenderer.send('vai-login'),
    irHome: () => ipcRenderer.send('vai-home'),
    irProducao: () => ipcRenderer.send('ir-producao'),
    irManutencao: () => ipcRenderer.send('ir-manutencao'),
    irInsumos: () => ipcRenderer.send('ir-insumo')
})

contextBridge.exposeInMainWorld("veiculoApi", {
    cadastrarVeiculo: async(veiculo: Veiculo) => await ipcRenderer.invoke("createVeiculo", veiculo),
    trazerVeiculos: async() => await ipcRenderer.invoke('trazerVeiculos')
   
})


contextBridge.exposeInMainWorld("insumo_veiculoApi", {
    cadastrar: async(associarInsumoVeiculo: any) => await ipcRenderer.invoke("cadastrar", associarInsumoVeiculo)
})



contextBridge.exposeInMainWorld("authApi", {
    hash: async(credenciais: any)  => await ipcRenderer.invoke("hash_password", credenciais)
})
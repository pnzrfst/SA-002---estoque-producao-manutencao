import {contextBridge, ipcRenderer } from "electron";
import Usuario from "../entity/Usuario";

contextBridge.exposeInMainWorld("dbAPI", {
    cadastrarUser: async(usuario : Usuario) => await ipcRenderer.invoke("create", usuario),
    verificarUserCadastrado: async(email: string) => await ipcRenderer.invoke("verify", email),
    acharContaCadastrada : async(email: string) => await ipcRenderer.invoke("searchByEmail", email)
})


contextBridge.exposeInMainWorld("navigationApi", {
    irCadastro: () => ipcRenderer.send('vai-cadastro'),
    voltarLogin: () => ipcRenderer.send('vai-login'),
    irHome: () => ipcRenderer.send('vai-home')
})

contextBridge.exposeInMainWorld("authApi", {
    hash: async(credenciais: any)  => await ipcRenderer.invoke("hash_password", credenciais)
})
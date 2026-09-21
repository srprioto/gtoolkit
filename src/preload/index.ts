import { contextBridge, ipcRenderer, webUtils } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

const api = {
  minimizar: (): void => ipcRenderer.send('window:minimizar'),
  maximizar: (): void => ipcRenderer.send('window:maximizar'),
  cerrar:    (): void => ipcRenderer.send('window:cerrar'),
  abrirFirmaPeru: (): Promise<{ ok: boolean }> => ipcRenderer.invoke('abrir-firmapperu'),
  abrirRuta: (ruta: string): Promise<{ ok: boolean; error: string }> =>
    ipcRenderer.invoke('abrir-ruta', ruta),
  copyReadonly: (srcPath: string, destFolder: string) =>
    ipcRenderer.invoke('file:copyReadonly', srcPath, destFolder),
  selectDocx: (): Promise<{ ok: boolean; path?: string }> =>
    ipcRenderer.invoke('file:selectDocx'),
  getFilePath: (file: File): string => webUtils.getPathForFile(file)
}

if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}

contextBridge.exposeInMainWorld('db', {
  create: (key: string, item: any) => ipcRenderer.invoke('db:create', key, item),
  read: (key: string) => ipcRenderer.invoke('db:read', key),
  update: (key: string, id: number, changes: any) => ipcRenderer.invoke('db:update', key, id, changes),
  delete: (key: string, id: number) => ipcRenderer.invoke('db:delete', key, id)
})
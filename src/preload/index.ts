import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

const api = {
	minimizar: (): void => ipcRenderer.send('window:minimizar'),
	maximizar: (): void => ipcRenderer.send('window:maximizar'),
	cerrar:    (): void => ipcRenderer.send('window:cerrar'),
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
import { ElectronAPI } from '@electron-toolkit/preload'

declare global {
	interface Window {
		electron: ElectronAPI
		api: {
			minimizar: () => void
			maximizar: () => void
			cerrar: () => void
			abrirFirmaPeru: () => Promise<{ ok: boolean }>
			abrirRuta: (ruta: string) => Promise<{ ok: boolean; error: string }>
		}
	}
}
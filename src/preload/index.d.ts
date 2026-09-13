import { ElectronAPI } from '@electron-toolkit/preload'

declare global {
	interface Window {
		electron: ElectronAPI
		api: {
			minimizar: () => void
			maximizar: () => void
			cerrar: () => void
		}
	}
}
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
		},
		db: {
			create: (key: string, item: any) => Promise<any>
			read: (key: string) => Promise<any[]>
			update: (key: string, id: number, changes: any) => Promise<any>
			delete: (key: string, id: number) => Promise<boolean>
    	}
	}
}
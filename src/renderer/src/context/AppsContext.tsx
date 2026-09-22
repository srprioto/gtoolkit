import { createContext, useContext, useEffect, useState } from 'react'

type AppsState = Record<string, boolean>

type AppsContextType = {
	mostrarApp: AppsState
	toggleApp: (nombre: string) => void
}

const DEFAULT_APPS: AppsState = {
	'Qellqa': true,
	'Firma Digital': true,
	'Guardar Documentos': true,
	"Unir PDF's": true,
	"Word a PDF's": true,
	'Verificar Firma': true,
	'E-mail': true,
}

const AppsContext = createContext<AppsContextType | null>(null)

export function AppsProvider({ children }: { children: React.ReactNode }) {
	const [mostrarApp, setMostrarApp] = useState<AppsState>(DEFAULT_APPS)
	const [loaded, setLoaded] = useState(false)

	// Cargar desde electron-store al iniciar
	useEffect(() => {
		window.db.read('apps').then((saved) => {
			if (saved && typeof saved === 'object' && !Array.isArray(saved)) {
				setMostrarApp({ ...DEFAULT_APPS, ...(saved as Record<string, boolean>) })
			}
			setLoaded(true)
		})
	}, [])

	// Persistir cada cambio
	useEffect(() => {
		if (!loaded) return
		window.db.set('apps', mostrarApp)
	}, [mostrarApp, loaded])

	const toggleApp = (nombre: string) => {
		setMostrarApp(prev => ({ ...prev, [nombre]: !prev[nombre] }))
	}

	return (
		<AppsContext.Provider value={{ mostrarApp, toggleApp }}>
			{children}
		</AppsContext.Provider>
	)
}

export function useApps() {
	const ctx = useContext(AppsContext)
	if (!ctx) throw new Error('useApps debe usarse dentro de AppsProvider')
	return ctx
}
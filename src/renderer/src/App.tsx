import './assets/main.scss'

import TitleBar from './components/TitleBar'
import Hero from './components/Hero'
import UnirPdfs from './pages/UnirPdfs'
import WordToPdf from './pages/WordPdf'
import FirmaDigital from './pages/FirmaDigital'
import VerificarFirma from './pages/VerificarFirma'
import NextCloud from './pages/nextcloud/NextCloud'
import Qellqa from './pages/Qellqa'
import EmailGeresa from './pages/Email'
import FirstPage from './pages/settings/firstpage/FirstPage'
import { useApps } from './context/AppsContext'
import { useEffect, useState } from 'react'

function App(): React.JSX.Element {

	const { mostrarApp } = useApps()
	const [firstPage, setFirstPage] = useState<number | null>(null)

	// Al iniciar: leer 'start'. Si no existe → crear { flag: 0 }
	useEffect(() => {
		(async () => {
			const data = await window.db.read('start')
			const existing = data?.[0]

			if (!existing) {
				await window.db.create('start', { flag: 0 })
				setFirstPage(0)
			} else {
				setFirstPage(existing.flag ?? 0)
			}
		})()
	}, [])



	// Botón: si está en 0 → actualizar a 1
	const handleStart = async () => {
		if (firstPage !== 0) return

		const data = await window.db.read('start')
		const existing = data?.[0]
		if (!existing) return

		await window.db.update('start', existing.id, { flag: 1 })
		setFirstPage(1)
	}


	// Mientras carga, no renderizamos nada
	if (firstPage === null) return <div className="app" />

	return (
		<div className="app">
			<TitleBar />

			{firstPage === 0 ? (
				<FirstPage handleStart={handleStart} />
			) : (
				<main className="app__content">
					<Hero />
					<section className="grid">
						{mostrarApp['Qellqa'] && <Qellqa />}
						{mostrarApp['Firma Digital'] && <FirmaDigital />}
						{mostrarApp['Guardar Documentos'] && <NextCloud />}
						{mostrarApp["Unir PDF's"] && <UnirPdfs />}
						{mostrarApp["Word a PDF's"] && <WordToPdf />}
						{mostrarApp['Verificar Firma'] && <VerificarFirma />}
						{mostrarApp['E-mail'] && <EmailGeresa />}
					</section>
				</main>
			)}
		</div>
	)
}

export default App
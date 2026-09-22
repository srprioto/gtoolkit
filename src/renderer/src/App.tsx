import './assets/main.scss';

import TitleBar from './components/TitleBar';
import Hero from './components/Hero';
import UnirPdfs from './pages/UnirPdfs';
import WordToPdf from './pages/WordPdf';
import FirmaDigital from './pages/FirmaDigital';
import VerificarFirma from './pages/VerificarFirma';
import NextCloud from './pages/nextcloud/NextCloud';
import Qellqa from './pages/Qellqa';
import { useApps } from './context/AppsContext';
import EmailGeresa from './pages/Email';

function App(): React.JSX.Element {
	const { mostrarApp } = useApps()

	return (
		<div className="app">
			<TitleBar />
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
		</div>
	)
}

export default App;

// https://react-icons.github.io/react-icons/icons/lu/
// import { IconName } from "react-icons/lu"

// https://react-icons.github.io/react-icons/icons/fc/
// import { IconName } from "react-icons/fc";


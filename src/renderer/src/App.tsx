import './assets/main.scss';

import TitleBar from './components/TitleBar';
import Hero from './components/Hero';
import UnirPdfs from './pages/UnirPdfs';
import WordToPdf from './pages/WordPdf';
import FirmaDigital from './pages/FirmaDigital';
import VerificarFirma from './pages/VerificarFirma';
import Scanner from './pages/Scanner';
import NextCloud from './pages/NextCloud';

function App(): React.JSX.Element {
	return (
		<div className="app">
			<TitleBar />
			<main className="app__content">
				<Hero />
				<section className="grid">
					<UnirPdfs />
					<WordToPdf />
					<FirmaDigital />
					<VerificarFirma />
					<NextCloud />
					<Scanner />

				</section>
			</main>
		</div>
	);
}

export default App;
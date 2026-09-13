import TitleBar from './components/TitleBar';
import Hero from './components/Hero';
import ActionCard from './components/ActionCard';
import './assets/app.scss';
import UnirPdfs from './pages/UnirPdfs';

function App(): React.JSX.Element {
	return (
		<div className="app">
			<TitleBar />
			<main className="app__content">
				<Hero />
				<section className="grid">
					<UnirPdfs />
					<ActionCard
						variant="word"
						icon="🔄"
						title="Convertir Word a PDF"
						description="Convierte tus documentos de Word a formato PDF."
					/>
					<ActionCard
						variant="shield"
						icon="🛡️"
						title="Verificar Firma Digital"
						description="Revisa la validez de las firmas digitales en tus documentos."
					/>
					<ActionCard
						variant="refirma"
						icon="🖥️"
						title="Firma Digital"
						description="Accede a la aplicación Refirma desde aquí."
					/>
					<ActionCard
						variant="scan"
						icon="🖨️"
						title="Escanear Documentos"
						description="Digitaliza tus documentos desde el escáner."
					/>
					<ActionCard
						variant="save"
						icon="📁"
						title="Guardar Documentos"
						description="Organiza y guarda tus archivos de forma rápida y segura."
					/>
				</section>
			</main>
		</div>
	);
}

export default App;
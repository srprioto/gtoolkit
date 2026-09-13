function TitleBar(): React.JSX.Element {


	const onClicCerrar = () => { 
		window.close();
	}

	return (
		<header className="titlebar">
			<div className="titlebar__left">
				<span className="titlebar__logo" aria-hidden>▦</span>
				<span className="titlebar__title">Gestor de Documentos</span>
			</div>
			<div className="titlebar__controls">
				<button className="titlebar__btn" aria-label="Minimizar" onClick={onClicCerrar}>─</button>
				<button className="titlebar__btn" aria-label="Maximizar">▢</button>
				<button className="titlebar__btn titlebar__btn--close" aria-label="Cerrar">✕</button>
			</div>
		</header>
	);
}

export default TitleBar;
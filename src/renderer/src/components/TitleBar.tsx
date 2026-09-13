function TitleBar(): React.JSX.Element {
	const handleMinimizar = (): void => {
		window.api?.minimizar()
	}

	const handleMaximizar = (): void => {
		window.api?.maximizar()
	}

	const handleCerrar = (): void => {
		window.api?.cerrar()
	}

	return (
		<header className="titlebar">
			<div className="titlebar__left">
				<span className="titlebar__logo" aria-hidden>▦</span>
				<span className="titlebar__title">Gestor de Documentos</span>
			</div>
			<div className="titlebar__controls">
				<button className="titlebar__btn" aria-label="Minimizar" onClick={handleMinimizar}>─</button>
				<button className="titlebar__btn" aria-label="Maximizar" onClick={handleMaximizar}>▢</button>
				<button className="titlebar__btn titlebar__btn--close" aria-label="Cerrar" onClick={handleCerrar}>✕</button>
			</div>
		</header>
	)
}

export default TitleBar
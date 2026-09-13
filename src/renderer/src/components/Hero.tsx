function Hero(): React.JSX.Element {
	return (
		<div className="hero">
			<div className="hero__icon" aria-hidden>
				<span className="hero__spark hero__spark--l1" />
				<span className="hero__spark hero__spark--l2" />
				<span className="hero__spark hero__spark--r1" />
				<span className="hero__spark hero__spark--r2" />
				<div className="hero__doc">
					<div className="hero__doc-back" />
					<div className="hero__doc-front" />
				</div>
			</div>
			<h1 className="hero__title">
				Todo lo que necesitas,
				<br />
				en un solo lugar
			</h1>
			<p className="hero__subtitle">Selecciona una opción para continuar</p>
		</div>
	);
}

export default Hero;
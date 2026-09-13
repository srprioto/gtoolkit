import iconGeresa from '@renderer/assets/imgs/geresa.jpg'

function Hero(): React.JSX.Element {
	return (
		<div className="hero">
			<div className="hero__icon" aria-hidden>
				<img src={iconGeresa} alt="Cargando" width={90} height={90} />
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
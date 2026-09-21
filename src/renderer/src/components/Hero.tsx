import iconGeresa from '@renderer/assets/imgs/geresa.jpg'
import { LuSettings } from 'react-icons/lu';
import { useState } from 'react';
import ModalSettings from '../pages/settings/ModalSettings';

function Hero(): React.JSX.Element {

	const [showModal, setShowModal] = useState(false);

	return (
		<div className="hero">

			<button className='icon_settings' onClick={() => { setShowModal(!showModal) } }>
				<LuSettings size={25} />
			</button>

			<div className="hero__icon" aria-hidden>
				<img src={iconGeresa} alt="Cargando" width={90} height={90} />
			</div>

			<h1 className="hero__title">
				Todo lo que necesitas,
				<br />
				en un solo lugar
			</h1>
			
			<p className="hero__subtitle">Selecciona una opción para continuar</p>

			<ModalSettings
				showModal={showModal}
				setShowModal={setShowModal}
			/>

		</div>
	);
}




export default Hero;
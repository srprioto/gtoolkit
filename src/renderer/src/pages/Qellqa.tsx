import ActionCard from "@renderer/components/ActionCard"
import logoQellqa from '@renderer/assets/imgs/logo-qellqa-white.svg'

import ModalFull from "@renderer/components/modals/ModalFull";
import { useState } from "react"

export default function Qellqa() {

	const [showModal, setShowModal] = useState(false);

	const unirPdf:string = "https://qellqa.regioncusco.gob.pe/auth";
	

	return (
		<>
			<ActionCard
				// variant="qellqa"
				icon={logoQell()}
				title="Qellqa"
				description="Sistema de tramite documentario."
				onClick={() => { setShowModal(!showModal) } }
			/>

			<ModalFull 
				showModal={showModal}
				setShowModal={setShowModal}
			>
				<webview
					src={unirPdf}
					style={{ width: '100%', height: '100%', border: 'none' }}
				/>
			</ModalFull>

		</>
	)
}


function logoQell() {

	return (
		<img src={logoQellqa} alt="" />
	)
}



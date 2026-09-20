import ActionCard from "@renderer/components/ActionCard";
import ModalWeb from "@renderer/components/modals/ModalWeb";
import { useState } from "react";

export default function VerificarFirma() {

	const [showModal, setShowModal] = useState(false);

	const verificarFirma:string = "https://apps.firmaperu.gob.pe/web/validador.xhtml";
	

	return (
		<>
			<ActionCard
				// variant="shield"
				icon="🛡️"
				title="Verificar Firma Digital"
				description="Revisa la validez de las firmas digitales en tus documentos."
				onClick={() => { setShowModal(!showModal) } }
			/>

			<ModalWeb 
				showModal={showModal}
				setShowModal={setShowModal}
			>
				<webview
					src={verificarFirma}
					style={{ width: '100%', height: '100%', border: 'none' }}
				/>
			</ModalWeb>
		
		</>
	)
}

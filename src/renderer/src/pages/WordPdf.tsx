import ActionCard from "@renderer/components/ActionCard";
import Modal from "@renderer/components/Modal";
import { useState } from "react";

export default function WordToPdf() {

	const [showModal, setShowModal] = useState(false);

	const convertirWordToPdf:string = "https://www.ilovepdf.com/es/word_a_pdf";


	return (
		<>
			<ActionCard
				// variant="word"
				icon="🔄"
				title="Convertir Word a PDF"
				description="Convierte tus documentos de Word a formato PDF."
				onClick={() => { setShowModal(!showModal) } }
			/>
			
			<Modal 
				showModal={showModal}
				setShowModal={setShowModal}
			>
				<webview
					src={convertirWordToPdf}
					style={{ width: '100%', height: '100%', border: 'none' }}
				/>
			</Modal>

		</>
	)
}

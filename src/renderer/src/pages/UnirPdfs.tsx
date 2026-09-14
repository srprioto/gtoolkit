import ActionCard from "@renderer/components/ActionCard"
import Modal from "@renderer/components/Modal"
import { useState } from "react"

export default function UnirPdfs() {

	const [showModal, setShowModal] = useState(false);

	const unirPdf:string = "https://www.ilovepdf.com/es/unir_pdf";
	

	return (
		<>
			<ActionCard
				// variant="pdf"
				icon="📄"
				title="Unir PDF's"
				description="Combina varios archivos PDF en uno solo."
				onClick={() => { setShowModal(!showModal) } }
			/>

			<Modal 
				showModal={showModal}
				setShowModal={setShowModal}
			>
				<webview
					src={unirPdf}
					style={{ width: '100%', height: '100%', border: 'none' }}
				/>
			</Modal>

		</>
	)
}

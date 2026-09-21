import ActionCard from "@renderer/components/ActionCard"
import Modal from "@renderer/components/modals/Modal"
import { useState } from "react"
import DocumentosTabs from "./DocumentosTabs"
import DropdownNxc from "./DropdownNxc"

export default function NextCloud(): React.JSX.Element {

	const _area = "D. E. deInteligencia sanitaria"

	const [showModal, setShowModal] = useState(false)
	
	

	return (
		<>
			<ActionCard
				icon="📁"
				title="Guardar Documentos"
				description="Organiza y guarda tus archivos de forma rápida y segura."
				onClick={() => setShowModal(!showModal)}
			/>

			<Modal
				titulo={"Gestión documental - " + _area}
				showModal={showModal}
				setShowModal={setShowModal}
			>
				<DropdownNxc />
				<DocumentosTabs />
			</Modal>
		</>
	)
}
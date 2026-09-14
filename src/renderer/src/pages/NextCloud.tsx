import ActionCard from "@renderer/components/ActionCard";
import Modal from "@renderer/components/Modal";
import { useState } from "react";

export default function NextCloud() {

	const [showModal, setShowModal] = useState(false);

	return (
		<>
			<ActionCard
				// variant="save"
				icon="📁"
				title="Guardar Documentos"
				description="Organiza y guarda tus archivos de forma rápida y segura."
				onClick={() => { setShowModal(!showModal) } }
			/>
			<Modal 
				showModal={showModal}
				setShowModal={setShowModal}
			>
				<h2>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam voluptatum quam eius optio amet non odit quaerat, vero fuga deserunt est voluptates doloribus at nihil adipisci veritatis quos veniam maiores.</h2>
			</Modal>
		</>
	)
}

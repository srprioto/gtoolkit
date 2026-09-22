import ActionCard from "@renderer/components/ActionCard";
import ModalWeb from "@renderer/components/modals/ModalWeb";
import { useState } from "react";
import { MdOutlineMailOutline } from "react-icons/md";

export default function EmailGeresa() {

	const [showModal, setShowModal] = useState(false);

	const emailGeresa:string = "https://webmail.diresacusco.gob.pe/";
	

	return (
		<>
			<ActionCard
				// variant="shield"
				icon={<MdOutlineMailOutline />}
				title="Email Geresa"
				description="Revisa tus correos electrónicos recibidos aquí."
				onClick={() => { setShowModal(!showModal) } }
			/>

			<ModalWeb 
				showModal={showModal}
				setShowModal={setShowModal}
			>
				<webview
					src={emailGeresa}
					style={{ width: '100%', height: '100%', border: 'none' }}
				/>
			</ModalWeb>
		
		</>
	)
}

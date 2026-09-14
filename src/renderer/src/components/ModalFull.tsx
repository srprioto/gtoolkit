import { ReactNode } from "react"

interface ModalProps {
	children: ReactNode,
	showModal: boolean,
	setShowModal: Function 
}

export default function ModalFull({ children, showModal, setShowModal }: ModalProps) {

	if (showModal) {
		return <div className="modal_full">

			<div className="background_modal"/>

			<div className="box_modal_full">
				<button className="back_modal" onClick={ () => setShowModal(!showModal) }>
					<svg
						width={30}
						height={30}
						viewBox="0 0 24 24"
						fill="none"
						stroke="#fff"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
					>
						<line x1="19" y1="12" x2="5" y2="12" />
						<polyline points="12 19 5 12 12 5" />
					</svg>
				</button>
				<span>{children}</span>
			</div>

		</div>
	} else {
		return null
	}
	

	
}

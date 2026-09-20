import { ReactNode } from "react"

interface ModalProps {
	children: ReactNode,
	showModal: boolean,
	setShowModal: Function,
	titulo: String
}

export default function Modal({ children, showModal, setShowModal, titulo }: ModalProps) {

	if (showModal) {
		return <div className="modal">

			<div className="background_modal"/>

			<div className="box_modal">
				<button className="back_modal" onClick={ () => setShowModal(!showModal) }>
					<svg
						width={20}
						height={20}
						viewBox="0 0 24 24"
						fill="none"
						stroke="#000"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
					>
						<line x1="19" y1="12" x2="5" y2="12" />
						<polyline points="12 19 5 12 12 5" />
					</svg>
				</button>
				<div className="titulo_modal">
					<h2>Configuración</h2>
				</div>
				<span>
					{children}
				</span>
			</div>

		</div>
	} else {
		return null
	}
	
}

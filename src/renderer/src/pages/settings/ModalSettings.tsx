import { useState } from 'react'
import { LuPenTool, LuSave, LuSettings } from 'react-icons/lu'
import Modal from '@renderer/components/modals/Modal'

interface Props {
	showModal: boolean
	setShowModal: (v: boolean) => void
}

const ITEMS = [
	{ 
		label: "General",
		icon: <LuSettings />,
		content: <p>1111</p> 
	},
	{ 
		label: 'Qellqa',
		icon: <LuPenTool />,
		content: <p>22222</p> 
	},
	{ 
		label: 'Guardar Documentos',
		icon: <LuSave />,
		content: <p>333333</p> 
	},
]

export default function ModalSettings({ showModal, setShowModal }:Props) {

	const [active, setActive] = useState(0)

	return (
		<Modal 
			showModal={showModal} 
			setShowModal={setShowModal}
			titulo="Configuración"
		>
			<div className="config">
				<div className="config__body">
					<aside className="config__sidebar">
						{ITEMS.map((item, i) => (
							<button
								key={i}
								className={`config__item ${active === i ? 'is-active' : ''}`}
								onClick={() => setActive(i)}
							>
								{item.icon}
								<span>{item.label}</span>
							</button>
						))}
					</aside>

					<section className="config__content">
						{ITEMS[active].content}
					</section>
				</div>
			</div>
		</Modal>
	)
}





import { useState } from 'react'
import { LuPenTool, LuSave, LuSettings } from 'react-icons/lu'
import Modal from '@renderer/components/modals/Modal'
import NxcSetting from './NxcSetting'
import GeneralSetting from './GeneralSetting'

interface Props {
	showModal: boolean
	setShowModal: (v: boolean) => void
}

const ITEMS = [
	{ 
		label: "General",
		icon: <LuSettings />,
		content: <GeneralSetting/>
	},
	{ 
		label: 'Qellqa',
		icon: <LuPenTool />,
		content: <p>Qellqa</p> 
	},
	{ 
		label: 'Gestión documental',
		icon: <LuSave />,
		content: <NxcSetting/>
	},
]

export default function SettingsModal({ showModal, setShowModal }:Props) {

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





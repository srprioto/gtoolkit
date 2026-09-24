import { useEffect, useState } from 'react'
import { LuPencil, LuCheck, LuX } from 'react-icons/lu'

interface Props {
	keyItem: string // nombre del bloque al que corresopnde
	keyValue: string // nombre del valor
	descripcion: string
	inputRuta: string
	setInputRuta: Function
}

export default function ImputSimpleFirstPage({ keyItem, keyValue, descripcion, inputRuta, setInputRuta }: Props) {

	
	const [items, setItems] = useState<any[]>([])
	const [editing, setEditing] = useState(false)

	const load = async () => {
		const data = await window.db.read(keyItem)
		setItems(data)
		if (!editing) setInputRuta(data[0]?.[keyValue] || '')
	}


	useEffect(() => { 
		load() 
	}, [])


	const handleEdit = () => setEditing(true)

	const handleConfirm = async () => {
		if (!inputRuta.trim()) return
		const existing = items[0]
		if (existing) await window.db.update(keyItem, existing.id, { [keyValue]: inputRuta })
		else await window.db.create(keyItem, { [keyValue]: inputRuta })
		setEditing(false)
		load()
	}

	const handleCancel = () => {
		setEditing(false)
		setInputRuta(items[0]?.[keyValue] || '')
	}


	return (
		<div className="input_stg">
			<span className="input_desc_stg">{descripcion}</span>
			<input
				className="input_add_stg"
				value={inputRuta}
				onChange={(e) => setInputRuta(e.target.value)}
				disabled={!editing}
			/>
			{editing ? (
			<div className="input_btn_stg">
				<button onClick={handleConfirm}><LuCheck /></button>
				<button onClick={handleCancel}><LuX /></button>
			</div>
			) : (
				<div className="input_btn_stg">
					<button onClick={handleEdit}><LuPencil /></button>
				</div>
			)}
		</div>
	)
}


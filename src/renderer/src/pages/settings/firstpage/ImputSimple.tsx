import { useEffect, useState } from 'react'
import { LuPencil, LuCheck, LuX } from 'react-icons/lu'

interface Props {
	keyItem: string // nombre del bloque al que corresopnde
	keyValue: string // nombre del valor
	descripcion: string
}

export default function ImputSimple({ keyItem, keyValue, descripcion }: Props) {

	const [value, setValue] = useState('')
	const [items, setItems] = useState<any[]>([])
	const [editing, setEditing] = useState(false)

	const load = async () => {
		const data = await window.db.read(keyItem)
		setItems(data)
		if (!editing) setValue(data[0]?.[keyValue] || '')
	}


	useEffect(() => { 
		load() 
	}, [])


	const handleEdit = () => setEditing(true)

	const handleConfirm = async () => {
		if (!value.trim()) return
		const existing = items[0]
		if (existing) await window.db.update(keyItem, existing.id, { [keyValue]: value })
		else await window.db.create(keyItem, { [keyValue]: value })
		setEditing(false)
		load()
	}

	const handleCancel = () => {
		setEditing(false)
		setValue(items[0]?.[keyValue] || '')
	}


	return (
		<div className="input_stg">
			<span className="input_desc_stg">{descripcion}</span>
			<input
				className="input_add_stg"
				value={value}
				onChange={(e) => setValue(e.target.value)}
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


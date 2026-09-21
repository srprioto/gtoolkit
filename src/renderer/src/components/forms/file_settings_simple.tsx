import { useState } from 'react'
import { LuPencil, LuCheck, LuX } from 'react-icons/lu'

export default function FileSettingsSimple() {
	const [ruta, setRuta] = useState('')
	const [editing, setEditing] = useState(false)
	const [dragOver, setDragOver] = useState(false)

	// Carpeta destino (en dev, ruta del proyecto; en prod, usa app.getPath)
	const DEST_FOLDER = 'src/renderer/src/assets/docs'

	const handleEdit = () => setEditing(true)

	const handleCancel = () => {
		setEditing(false)
		setRuta('')
		setDragOver(false)
	}

	const handleClick = async () => {
		const res = await window.api.selectDocx()
		if (!res.ok || !res.path) return
		procesarArchivo(res.path)
	}

	const procesarArchivo = async (srcPath: string) => {
		setRuta(srcPath)
		const res = await window.api.copyReadonly(srcPath, DEST_FOLDER)
		console.log('Resultado:', res)
	}

	const handleDrop = async (e: React.DragEvent) => {
		e.preventDefault()
		setDragOver(false)

		const file = e.dataTransfer.files[0]
		if (!file) return
		if (!file.name.toLowerCase().endsWith('.docx')) {
			console.error('Solo se aceptan archivos .docx')
			return
		}

		// Ruta absoluta del archivo soltado
		const srcPath = window.api.getFilePath(file)
		if (!srcPath) return

		setRuta(srcPath)

		// Copiar + marcar readonly
		const res = await window.api.copyReadonly(srcPath, DEST_FOLDER)
		if (!res.ok) {
			console.error('Error:', res.error)
			return
		}

		console.log('Copiado como solo lectura en:', res.destPath)
	}

	const handleConfirm = async () => {
		// Si quieres guardar la ruta en electron-store, hazlo aquí:
		// await window.db.create('docs', { ruta })
		setEditing(false)
	}

	const handleDragOver = (e: React.DragEvent) => {
		e.preventDefault()
		setDragOver(true)
	}

	const handleDragLeave = () => setDragOver(false)

  	return (
		<div className="input_stg">
			<span className="input_desc_stg">Documento Word</span>

			{editing ? (
				<div
					className={`drop_zone ${dragOver ? 'drop_zone--over' : ''}`}
					onDrop={handleDrop}
					onDragOver={handleDragOver}
					onDragLeave={handleDragLeave}
					onClick={handleClick}
					style={{ cursor: 'pointer' }}
				>
					{ruta || 'Arrastra un .docx o haz clic aquí'}
				</div>
			) : (
				<span className="input_add_stg">{ruta || '—'}</span>
			)}

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
import { useState } from 'react'
import { useDropzone, FileRejection } from 'react-dropzone'
import { LuFileCheck, LuFile, LuCheck, LuX } from 'react-icons/lu'

type DropKind = 'sin-firmar' | 'firmado'

interface DropZoneProps {
	label: string
	kind: DropKind
	icon: React.JSX.Element
	destFolder?: string
	onFiles?: (files: File[]) => void
}

function DropZone({ label, icon, kind, destFolder, onFiles }: DropZoneProps): React.JSX.Element {
	const [pending, setPending] = useState<File[]>([])
	const [copiado, setCopiado] = useState(false)

	const onDrop = (accepted: File[]): void => {
		if (accepted.length === 0) return
		setPending(accepted)
		setCopiado(false)
	}

	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop,
		onDropRejected: (rej: FileRejection[]) => console.warn('Rechazados:', rej)
	})

	const handleConfirm = async (): Promise<void> => {
		if (!destFolder) {
			console.warn('DropZone sin destFolder, no se copia')
			return
		}

		for (const file of pending) {
			const srcPath = window.api.getFilePath(file)
			if (!srcPath) continue
			const res = await window.api.copyReadonly(srcPath, destFolder)
			if (!res.ok) console.error('Error copiando:', res.error)
			else console.log('Copiado en:', res.destPath)
		}

		onFiles?.(pending)
		setCopiado(true)
		setPending([])
	}

	const handleCancel = (): void => {
		setPending([])
		setCopiado(false)
	}

	return (
		<div className="dropzone-wrapper">
			<div
				{...getRootProps()}
				className={`dropzone ${isDragActive ? 'is-drag' : ''} ${copiado ? 'is-done' : ''}`}
			>
				<input {...getInputProps()} />
				<div className="dropzone__icon">{icon}</div>
				<span className="dropzone__label">{label}</span>
				<span className="dropzone__hint">
					{isDragActive
						? 'Suelta aquí'
						: copiado
							? 'Archivo cargado'
							: pending.length > 0
								? `${pending.length} archivo(s) pendiente(s)`
								: 'Arrastra o haz clic'}
				</span>
			</div>

			{pending.length > 0 && (
				<div className="dropzone__btns">
					<button onClick={handleConfirm}><LuCheck /></button>
					<button onClick={handleCancel}><LuX /></button>
				</div>
			)}
		</div>
	)
}

export default function DocumentosTabs(): React.JSX.Element {
	const [tab, setTab] = useState<number>(0)

	const DEST = {
		0: 'C:\\Users\\RenatoLuna\\Desktop\\Nueva carpeta',
		1: 'C:\\Users\\RenatoLuna\\Desktop\\Nueva carpeta',
		2: 'C:\\Users\\RenatoLuna\\Desktop\\Nueva carpeta'
	}

	return (
		<div className="docs">
			<nav className="docs__tabs">
				<button
					className={`docs__tab ${tab === 0 ? 'is-active' : ''}`}
					onClick={() => setTab(0)}
				>D. E. de Estadística</button>

				<button
					className={`docs__tab ${tab === 1 ? 'is-active' : ''}`}
					onClick={() => setTab(1)}
				>D. E. de Epidemiología</button>

				<button
					className={`docs__tab ${tab === 2 ? 'is-active' : ''}`}
					onClick={() => setTab(2)}
				>D. E. de Emergencias</button>
			</nav>

			<p className='docs__descripcion'>
				Arrastra cada documento a la zona <strong>Sin firmar</strong> o <strong>Firmado</strong> según corresponda.
			</p>

			<div className="docs__panel">
				{tab === 0 && (
					<div className="docs__row">
						<DropZone kind="sin-firmar" label="Sin firmar" icon={<LuFile size={40} />} />
						<DropZone
							kind="firmado"
							label="Firmado"
							icon={<LuFileCheck size={40} />}
							destFolder={DEST[0]}
						/>
					</div>
				)}

				{tab === 1 && (
					<div className="docs__row">
						<DropZone kind="sin-firmar" label="Sin firmar" icon={<LuFile size={40} />} />
						<DropZone
							kind="firmado"
							label="Firmado"
							icon={<LuFileCheck size={40} />}
							destFolder={DEST[1]}
						/>
					</div>
				)}

				{tab === 2 && (
					<div className="docs__row">
						<DropZone kind="sin-firmar" label="Sin firmar" icon={<LuFile size={40} />} />
						<DropZone
							kind="firmado"
							label="Firmado"
							icon={<LuFileCheck size={40} />}
							destFolder={DEST[2]}
						/>
					</div>
				)}
			</div>
		</div>
	)
}
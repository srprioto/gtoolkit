import { useState } from 'react'
import { useDropzone, FileRejection } from 'react-dropzone'
import { LuFileUp, LuFileCheck } from 'react-icons/lu'

type DropKind = 'sin-firmar' | 'firmado'

interface DropZoneProps {
	label: string
	kind: DropKind
	icon: React.JSX.Element
	onFiles?: (files: File[]) => void
}

function DropZone({ label, icon, kind, onFiles }: DropZoneProps): React.JSX.Element {
	const onDrop = (accepted: File[]): void => {
		onFiles?.(accepted)
		console.log(`[${kind}]`, accepted)
		// TODO: subir a Nextcloud (guardar File[] por ahora)



	}

	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop,
		onDropRejected: (rej: FileRejection[]) => console.warn('Rechazados:', rej),
	})


	return (
		<div
			{...getRootProps()}
			className={`dropzone ${isDragActive ? 'is-drag' : ''}`}
		>
			<input {...getInputProps()} />
			<div className="dropzone__icon">{icon}</div>
			<span className="dropzone__label">{label}</span>
			<span className="dropzone__hint">
				{isDragActive ? 'Suelta aquí' : 'Arrastra o haz clic'}
			</span>
		</div>
	)

}

export default function DocumentosTabs(): React.JSX.Element {
	const [tab, setTab] = useState<Number>(0)

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

			<p className='docs__descripcion'>Arrastra cada documento a la zona <strong>Sin firmar</strong> o <strong>Firmado</strong> según corresponda. Asegúrate de que el archivo pertenece al área seleccionada antes de soltarlo.</p>

			<div className="docs__panel">


				{tab === 0 && (
					<div className="docs__row">
						<DropZone kind="sin-firmar" label="Sin firmar" icon={<LuFileUp size={40} />} />
						<DropZone kind="firmado"    label="Firmado"    icon={<LuFileCheck size={40} />} />
					</div>
				)}
				{tab === 1 && (
					<div className="docs__row">
						<DropZone kind="sin-firmar" label="Sin firmar" icon={<LuFileUp size={40} />} />
						<DropZone kind="firmado"    label="Firmado"    icon={<LuFileCheck size={40} />} />
					</div>
				)}
				{tab === 2 && (
					<div className="docs__row">
						<DropZone kind="sin-firmar" label="Sin firmar" icon={<LuFileUp size={40} />} />
						<DropZone kind="firmado"    label="Firmado"    icon={<LuFileCheck size={40} />} />
					</div>
				)}


			</div>
		</div>
	)
}
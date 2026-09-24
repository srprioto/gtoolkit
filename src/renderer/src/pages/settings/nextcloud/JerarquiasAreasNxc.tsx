import { useState } from 'react'
import { LuChevronDown } from 'react-icons/lu'

const OPCIONES: { id: any; label: string }[] = [
	{ id: 'deis', label: 'D.E. Inteligencia sanitaria' },
	{ id: 'opcion2', label: 'Opción 2' },
	{ id: 'opcion3', label: 'Opción 3' },
	{ id: 'opcion4', label: 'Opción 4' }
]


const AREAS: Record<any, string[]> = {
	deis: [
		'Epidemiologia', 
		'Emergencias', 
		'Estaditica'
	],
	opcion2: [
		'Área B1', 
		'Área B2', 
		'Área B3'
	],
	opcion3: [
		'Área C1', 
		'Área C2', 
		'Área C4', 
		'Área C3',

	],
	opcion4: [
		'Área D1', 
		'Área D2', 
		'Área D3',
		'Área D4',
		'Área D5',
	]
}


export default function JerarquiasAreasNxc({ jerarquia, setJerarquia, areas, setAreas }) {
	
	// const [jerarquia, setJerarquia] = useState<any | ''>('')
	// const [areas, setAreas] = useState<Record<string, boolean>>({})

	const handleJerarquia = (val: any) => {
		setJerarquia(val)
		setAreas({}) // resetea switches al cambiar jerarquía
	}

	const toggleArea = (key: string) => {
		setAreas(prev => ({ ...prev, [key]: !prev[key] }))
	}

	// console.log(jerarquia);
	// console.log(areas);
	

	return (
		<div className="jerarquias">
			<h3 className="jerarquias__title">Jerarquía/Área para gestion de archivos</h3>

			{/* Nivel 1: select de jerarquía */}
			<div className="select">
				<select
					className="select__input"
					value={jerarquia}
					onChange={(e) => handleJerarquia(e.target.value)}
				>
					<option value="" disabled>Selecciona una jerarquía</option>
					{OPCIONES.map(o => (
						<option key={o.id} value={o.id}>{o.label}</option>
					))}
				</select>
				<LuChevronDown className="select__icon" />
			</div>

			{/* Nivel 2: switches dependientes */}
			{jerarquia && (
				<div className="jerarquias__switches">
					{AREAS[jerarquia].map(area => {
						const key = `${jerarquia}:${area}`
						const checked = !!areas[key]
						return (
							<label key={key} className="switch">
								<input
									type="checkbox"
									checked={checked}
									onChange={() => toggleArea(key)}
								/>
								<span className="switch__track">
									<span className="switch__thumb" />
								</span>
								<span className="switch__label">{area}</span>
							</label>
						)
					})}
				</div>
			)}
		</div>
	)
}
import { useApps } from "@renderer/context/AppsContext"

export default function GeneralSetting() {
	const { mostrarApp, toggleApp } = useApps()

	return (
		<div className="stg">
			<div className='categ_stgs'>
				<h3 className='subtit_stgs'>Apps</h3>

				<div className="checks_grid">
					{Object.keys(mostrarApp).map(nombre => (
						<label className="check_item" key={nombre}>
							<input
								type="checkbox"
								checked={mostrarApp[nombre]}
								onChange={() => toggleApp(nombre)}
							/>
							<span>{nombre}</span>
						</label>
					))}
				</div>




				
			</div>
		</div>
	)
}
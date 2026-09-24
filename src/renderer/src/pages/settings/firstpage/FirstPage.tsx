import ImputSettingsSimple from "@renderer/components/forms/input_settings_simple";
import JerarquiasAreasNxc from "../nextcloud/JerarquiasAreasNxc";
import { useEffect, useState } from "react";


export default function FirstPage({handleStart}) {

	const [rdyNext, setRdyNext] = useState<boolean>(false);

	
	const [text, setText] = useState<string>("");

	const [jerarquia, setJerarquia] = useState<any | ''>('')
	const [areas, setAreas] = useState<Record<string, boolean>>({})


	// useEffect(() => {
	// 	const textOk = text !== '' && text != null
	// 	setRdyNext(jerarquias && textOk)
	// }, [text, jerarquias])
	

	return (
		<div className="first_page">
			<div className="bienvenida">
				<h2>¡Hola! Configuremos tu espacio</h2>
				{/* <p>Vamos a ajustar las configuraciones iniciales para adaptar la aplicación a tu forma de trabajar. Solo tomará un momento.</p> */}
			</div>

			<div className="bienvenida">
				<h3 className="jerarquias__title">Ubicacion de carpeta NextCloud</h3>
				<ImputSettingsSimple 
					keyItem="nxc_ruta_desktop" 
					keyValue="ruta_desktop" 
					descripcion="Ruta de NextCloud" 
					onChange={setText}
				/>
			</div>
			
			<JerarquiasAreasNxc 
				jerarquia={jerarquia}
				setJerarquia={setJerarquia}
				areas={areas}
				setAreas={setAreas}
			/>

			<div className="box_btn_start">
				<button 
					className={"btn_start" + (rdyNext ? "" : " btn_inact")} 
					onClick={ rdyNext ? handleStart : null}
				>
					Comenzar
				</button>
			</div>


		</div>
	)
}

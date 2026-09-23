import ImputSettingsSimple from "@renderer/components/forms/input_settings_simple";
import JerarquiasAreasNxc from "../nextcloud/JerarquiasAreasNxc";


export default function FirstPage({handleStart}) {


	return (
		<div className="first_page">
			<div className="bienvenida">
				<h2>¡Hola! Configuremos tu espacio</h2>
				{/* <p>Vamos a ajustar las configuraciones iniciales para adaptar la aplicación a tu forma de trabajar. Solo tomará un momento.</p> */}
			</div>

			<div className="bienvenida">
				<h3 className="jerarquias__title">
					Ubicacion de carpeta NextCloud
				</h3>
				<ImputSettingsSimple 
					keyItem="nxc_ruta_desktop" 
					keyValue="ruta_desktop" 
					descripcion="Ruta de NextCloud" 
				/>
			</div>
			
			<JerarquiasAreasNxc/>


			<div className="box_btn_start">
				<button className="btn_start" onClick={handleStart}>
					Comenzar
				</button>
			</div>


		</div>
	)
}

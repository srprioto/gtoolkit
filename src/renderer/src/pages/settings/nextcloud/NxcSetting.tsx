import FileSettingsSimple from '@renderer/pages/settings/nextcloud/file_settings_simple'
import ImputSettingsSimple from '@renderer/components/forms/input_settings_simple'

export default function NxcSetting() {
	
	


	return (
		<div className="stg">

			<div className='categ_stgs'>
				<h3 className='subtit_stgs'>Conectar</h3>
				<ImputSettingsSimple 
					keyItem="nxc_ruta_desktop" 
					keyValue="ruta_desktop" 
					descripcion="Ruta de NextCloud" 
				/>
			</div>

			<div className='categ_stgs'>
				<h3 className='subtit_stgs'>Documentos</h3>
				<FileSettingsSimple/>
			</div>


			<div className="categ_stgs">
				<h3 className='subtit_stgs'>Jerarquía</h3>
				
			</div>

			<div className="categ_stgs">
				<h3 className='subtit_stgs'>Cloud</h3>
				
			</div>



		</div>
	)
}

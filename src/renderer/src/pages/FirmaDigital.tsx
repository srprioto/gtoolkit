import ActionCard from '@renderer/components/ActionCard'
import ModalLoad from '@renderer/components/ModalLoad';
import { useState } from 'react'

export default function FirmaDigital(): React.JSX.Element {

	const [loading, setLoading] = useState(false);

	const handleAbrir = async (): Promise<void> => {
		
		try {
			setLoading(true)
			await window.api?.abrirFirmaPeru()
		} catch (err) {
			setLoading(true)
			console.error('Error al abrir FirmaPeru:', err)
		} finally {
			setLoading(false)
		}
		
	}

	return (
		<>
			<ActionCard
				variant="refirma"
				icon="🖥️"
				title="Firma Digital"
				description="Accede a la aplicación Refirma desde aquí."
				onClick={handleAbrir}
			/>
			<ModalLoad loading={loading}/>
		</>
	)


	

}
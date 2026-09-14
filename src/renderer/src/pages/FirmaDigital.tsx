import ActionCard from '@renderer/components/ActionCard'
import logoRefirma from '@renderer/assets/imgs/refirma.png'
import ModalLoad from '@renderer/components/ModalLoad';
import { useRef, useState } from 'react'

export default function FirmaDigital(): React.JSX.Element {

	const [loading, setLoading] = useState(false);

	const lastClickRef = useRef<number>(0)

	const handleAbrir = async (): Promise<void> => {
		const now = Date.now()
		if (now - lastClickRef.current < 2000) return
		lastClickRef.current = now

		try {
			setLoading(true)

			await Promise.all([
				window.api?.abrirFirmaPeru(),
				new Promise((resolve) => setTimeout(resolve, 2000))
			])
		} catch (err) {
			console.error('Error al abrir FirmaPeru:', err)
		} finally {
			setLoading(false)
		}
	}

	return (
		<>
			<ActionCard
				// variant="refirma"
				icon={refirma()}
				title="Firma Digital"
				description="Accede a la aplicación Refirma desde aquí."
				onClick={handleAbrir}
			/>
			<ModalLoad loading={loading}/>
		</>
	)


	

}

function refirma() {

	return (
		<img src={logoRefirma} alt="" />
	)
}


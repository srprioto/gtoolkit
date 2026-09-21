import { useEffect, useRef, useState } from "react"
import { LuEllipsisVertical, LuFilePlus2, LuFolderOpen } from "react-icons/lu"

export default function DropdownNxc() {

	const [openMenu, setOpenMenu] = useState(false)
	const menuRef = useRef<HTMLDivElement>(null)
	const [route, setRoute] = useState<string>("")
	

	useEffect(() => {

		// recuperar url:
		cargarRuta()

		const onClickOutside = (e: MouseEvent): void => {
			if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
				setOpenMenu(false)
			}
		}
		document.addEventListener("mousedown", onClickOutside)
		return () => document.removeEventListener("mousedown", onClickOutside)


	}, [])


	const cargarRuta = async () => {
		const data = await window.db.read('nxc')
		setRoute(data[0]?.value || '')
	}


	// abrir carpeta en nextcloud (requiere automatizar ruta)
	const handleAbrirCarpeta = async (): Promise<void> => {
		setOpenMenu(false)

		const res = await window.api?.abrirRuta(route)
		if (!res?.ok) console.error('Error:', res?.error)
	}

	const handleCargarPlantilla = (): void => {
		setOpenMenu(false)
		


	}
	

	return (
		<div className="dropdown_nextcloud" ref={menuRef}>
			<button
				className="dropdown_nextcloud__trigger"
				onClick={() => setOpenMenu(!openMenu)}
				aria-label="Opciones"
			>
				<LuEllipsisVertical size={20} />
			</button>

			{openMenu && (
				<div className="dropdown_nextcloud__menu">

					<button
						className="dropdown_nextcloud__item"
						onClick={handleAbrirCarpeta}
					>
						<LuFolderOpen size={18} /><span>Abrir carpeta</span>
					</button>


					<button
						className="dropdown_nextcloud__item"
						onClick={handleCargarPlantilla}
					>
						<LuFilePlus2 size={18} /><span>Cargar plantilla</span>
					</button>

				</div>
			)}
		</div>
	)
}

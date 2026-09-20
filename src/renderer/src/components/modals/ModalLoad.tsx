interface ModalProps {
	loading: boolean
}

export default function ModalLoad({ loading }: ModalProps) {


	return (
		loading ?
		<div className="modal_loading">

			<div className="background_modal"/>

			<div className="box_load_modal">

				<svg
					width="50px"
					height="50px"
					viewBox="0 0 24 24"
					fill="none"
					stroke="#000"
					strokeWidth="2.5"
					strokeLinecap="round"
				>
					<path d="M12 2 a10 10 0 0 1 10 10">
						<animateTransform
							attributeName="transform"
							type="rotate"
							from="0 12 12"
							to="360 12 12"
							dur="1s"
							repeatCount="indefinite"
						/>
					</path>
				</svg>

			</div>

		</div>
		: <></>
	)
}

interface ActionCardProps {
	// variant: any;
	icon: string|any;
	title: string;
	description: string;
	onClick?: () => void;
}

function ActionCard({ icon, title, description, onClick }: ActionCardProps): React.JSX.Element {
	return (
		<button type="button" className="card" onClick={onClick}>
			<div className={`card__icon card__icon--bg_icon`}>
				<span className="card__emoji">{icon}</span>
			</div>
			<h3 className="card__title">{title}</h3>
			<p className="card__desc">{description}</p>
		</button>
	);
}

export default ActionCard;




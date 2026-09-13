type Variant = 'pdf' | 'word' | 'shield' | 'refirma' | 'scan' | 'save';

interface ActionCardProps {
	variant: Variant;
	icon: string;
	title: string;
	description: string;
	onClick?: () => void;
}

function ActionCard({ variant, icon, title, description, onClick }: ActionCardProps): React.JSX.Element {
	return (
		<button type="button" className="card" onClick={onClick}>
			<div className={`card__icon card__icon--${variant}`}>
				<span className="card__emoji">{icon}</span>
			</div>
			<h3 className="card__title">{title}</h3>
			<p className="card__desc">{description}</p>
		</button>
	);
}

export default ActionCard;




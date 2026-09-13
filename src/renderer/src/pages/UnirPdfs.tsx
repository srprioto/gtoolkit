import ActionCard from "@renderer/components/ActionCard"

export default function UnirPdfs() {
	return (
		<ActionCard
			variant="pdf"
			icon="📄"
			title="Unir PDF's"
			description="Combina varios archivos PDF en uno solo."
			onClick={() => { alert("hola")} }
		/>
	)
}

type CardProps = {
	name: string;
	text: string;
};

export default function Card({ name, text }: CardProps) {
	return (
		<div class="rounded border-4 border-black p-4 m-4 h-full">
			<h2>{name}</h2>
			<p>{text}</p>
		</div>
	);
}

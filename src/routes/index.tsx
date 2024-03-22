import type { Elysia } from 'elysia';
import Card from '../components/card';

export default function indexGroup(app: Elysia, prefix: string) {
	return app.group(prefix, (app) => app.get('/', () => (
		<html lang="en">
			<head>
				<title>RustBytes</title>

				<meta name="viewport" content="width=device-width"/>
				<meta name="description" content="Ben McAvoy's CV."/>

				<link rel="stylesheet" href="/public/style.css" />
			</head>
			<body>
				<h1>Welcome to RustBytes</h1>

				<div class="container">
					<Card name="Rust" text="A systems programming language that runs blazingly fast, prevents segfaults, and guarantees thread safety." />
				</div>
			</body>
		</html>
	)))
}

import type { Elysia } from 'elysia';
import Card from '../../components/card';

export default function cvGroup(app: Elysia, prefix: string) {
	return app.group(prefix, (app) => app.get('/', () => (
    <html lang="en">
      <head>
          <title>Hello World</title>

					<meta name="viewport" content="width=device-width"/>
					<meta name="description" content="Ben McAvoy's CV."/>

					<link rel="stylesheet" href="/public/style.css" />
      </head>
      <body>
				<h1 class="text-center">Languages</h1>

				<br/>

				<div class="container place-items-center">
					<Card name="Rust" text="A systems programming language that runs blazingly fast, prevents segfaults, and guarantees thread safety." />
					<Card name="Python" text="Python is a programming language that lets you work quickly and integrate systems more effectively." />
					<Card name="C" text="C is a general-purpose, procedural computer programming language supporting structured programming, lexical variable scope, and recursion." />
				</div>
      </body>
    </html>
	)))
}

/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Bind resources to your worker in `wrangler.toml`. After adding bindings, a type definition for the
 * `Env` object can be regenerated with `npm run cf-typegen`.
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

export default {
	async fetch(request, env, ctx) {
		const headers = new Headers();
		headers.set("x-godsreveal-auth", env.AUTH_HEADER_SECRET);
		headers.set("referer", env.REFERER);

		return fetch(`${env.SERVER_URL}${new URL(request.url).pathname}`, {
			method: request.method,
			headers,
			body: request.body,
		});
	},
} satisfies ExportedHandler<Env>;

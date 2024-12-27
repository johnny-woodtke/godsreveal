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
		// ensure origin is valid
		const origin = request.headers.get("Origin");
		const validOrigins = env.VALID_ORIGINS.split(",");
		if (!origin || !validOrigins.includes(origin)) {
			return new Response("Unauthorized", { status: 401 });
		}

		// add auth headers
		const headers = new Headers();
		headers.set("x-godsreveal-auth", env.AUTH_HEADER_SECRET);
		headers.set("referer", env.REFERER);

		// forward request to server
		return fetch(`${env.SERVER_URL}${new URL(request.url).pathname}`, {
			method: request.method,
			headers,
			body: request.body,
		});
	},
} satisfies ExportedHandler<Env>;

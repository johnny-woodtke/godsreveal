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
		// log original request
		logRequest("INCOMING REQUEST", request);

		// ensure origin is valid
		const origin = request.headers.get("x-forwarded-host");
		const validOrigins = env.VALID_ORIGINS.split(",");
		if (!origin || !validOrigins.includes(origin)) {
			return new Response("Unauthorized", { status: 401 });
		}

		// add auth headers
		const requestHeaders = new Headers(request.headers);
		requestHeaders.set("x-godsreveal-auth", env.AUTH_HEADER_SECRET);
		requestHeaders.set("referer", env.REFERER);

		// update request URL
		const url = new URL(request.url);
		const newUrl = new URL(url.pathname + url.search, env.SERVER_URL);

		// create new request
		const newRequest = new Request(newUrl, {
			method: request.method,
			headers: requestHeaders,
			body: request.body,
		});

		// log request to forward
		logRequest("FORWARDING REQUEST", newRequest);

		// forward request to server and get response
		const response = await fetch(newRequest);

		// log response
		logResponse("RESPONSE", response);

		// remove auth headers
		const responseHeaders = new Headers(response.headers);
		responseHeaders.delete("x-forwarded-host");
		responseHeaders.delete("x-godsreveal-auth");
		responseHeaders.delete("referer");

		// copy response
		const newResponse = new Response(response.body, {
			...response,
			headers: responseHeaders,
		});

		// log response to return
		logResponse("RETURNING RESPONSE", newResponse);

		// return response to client
		return newResponse;
	},
} satisfies ExportedHandler<Env>;

function logRequest(message: string, request: Request) {
	console.log(message, "\n", {
		method: request.method,
		url: request.url,
		headers: request.headers,
	});
}

function logResponse(message: string, response: Response) {
	console.log(message, "\n", {
		status: response.status,
		statusText: response.statusText,
		headers: response.headers,
	});
}

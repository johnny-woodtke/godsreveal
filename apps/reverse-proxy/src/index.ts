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
		// log if development
		if (env.NODE_ENV === "development") {
			console.log("REQUEST\n", {
				url: request.url,
				method: request.method,
				headers: request.headers,
			});
		}

		// ensure origin is valid
		const validOrigin = validateOrigin(request, env);
		if (!validOrigin) {
			return new Response("Unauthorized", { status: 401 });
		}

		// create new request
		const newRequest = new Request(getServerUrl(new URL(request.url), env), {
			method: request.method,
			headers: addAuthHeaders(request.headers, env),
			body: request.body,
		});

		// forward request to server and get response
		const response = await fetch(newRequest);

		// copy response
		const newResponse = new Response(response.body, {
			...response,
			headers: filterAuthHeaders(response.headers),
		});

		// return response to client
		return newResponse;
	},
} satisfies ExportedHandler<Env>;

function validateOrigin(request: Request, env: Env): boolean {
	// get origin headers
	const forwardedHost = request.headers.get("x-forwarded-host");
	const referer = request.headers.get("referer");

	// get valid origins
	const validOrigins = env.VALID_ORIGINS.split(",");

	// validate origin headers
	return (
		!!forwardedHost &&
		validOrigins.includes(forwardedHost) &&
		!!referer &&
		validOrigins.some((origin) => referer.includes(origin))
	);
}

function getServerUrl(url: URL, env: Env): URL {
	return new URL(url.pathname + url.search, env.SERVER_URL);
}

function addAuthHeaders(headers: Headers, env: Env): Headers {
	// copy headers
	const newHeaders = new Headers(headers);

	// add auth headers
	newHeaders.set("x-godsreveal-auth", env.AUTH_HEADER_SECRET);
	newHeaders.set("referer", env.REFERER);

	// return new headers
	return newHeaders;
}

const AUTH_HEADERS: Record<string, boolean> = {
	"x-godsreveal-auth": true,
	referer: true,
	"x-forwarded-host": true,
};

const CORS_HEADERS = [
	"access-control-allow-headers",
	"access-control-expose-headers",
];

function filterAuthHeaders(headers: Headers): Headers {
	// copy headers
	const responseHeaders = new Headers(headers);

	// remove auth headers
	for (const header of Object.keys(AUTH_HEADERS)) {
		responseHeaders.delete(header);
	}

	// filter auth headers from CORS headers
	for (const header of CORS_HEADERS) {
		const value = responseHeaders.get(header);
		if (value) {
			responseHeaders.set(
				header,
				value
					.split(", ")
					.filter((header) => !AUTH_HEADERS[header])
					.join(", "),
			);
		}
	}

	// return filtered headers
	return responseHeaders;
}

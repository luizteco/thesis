# thesis

## description

Web app that offers users 3D files. Users can input different measurments, which will then adjust the file to be downloaded. Welcome page > selection of product > for each product measurment inputs > download > assembly instructions

## architecture

### context




Per-product overrides: in `public/devices.toml` you can add optional fields per device:
	- `downloadFilePattern` — pattern for the main 3D file for that product (uses the same placeholders).
	- `extraFiles` — array of additional filenames to include in the ZIP (e.g. `"instructions.txt"`, `"assembly.pdf"`).
	- `prefixUrl` — optional URL to override the global host (useful when a product's files are stored on a different bucket or Cloudflare path).

We now support per-product download rules for the product categories used in the project:

- cutlery: two files per download. The device entry can provide `variablePattern` and `handleYesParts`/`handleNoParts` arrays. The UI shows a checkbox to include the handle. Example pattern: `"h{h}-w{w}-{part}.stl"` with parts `["body","handle"]` or `["body","top"]`.
- cup: three static files (e.g. `"cup-support.stl"`, `"FlexStick.stl"`, `"Lock.stl"`) plus one variable file based on height+thickness using pattern `"h{h}-t{t}.stl"`. The UI includes a thickness input.
- button: a static `pin.stl` plus three variable parts (`sa`, `sb`, `hook`) using pattern `"h{h}-w{w}-{part}.stl"`.
- bidet: a single static file (e.g., `bidet.stl`) — same for every user.

Add these fields to the device entry in `public/devices.toml` (see example entries there). The site will build the exact URLs from the configured pattern and prefix URL, fetch each file from your Cloudflare-hosted bucket, and package them into a ZIP for download.

Local simulation scripts
------------------------

Use the included scripts to verify downloads locally before users request them in the browser.

- Run a single product simulation (Button):

	npm run simulate:download:button

	This will fetch the files configured for `button` in `public/devices.toml` and create `simulated-download-button.zip` in the project root.

- Run all device simulations:

	npm run simulate:download:all

	This will parse `public/devices.toml` and attempt to fetch the files for each device, producing `simulated-download-<id>.zip` files in the project root. Useful to validate that your patterns and filenames match the actual files in Cloudflare R2.

	Troubleshooting CORS (browser "Failed to fetch")
	-------------------------------------------------

	If a browser download fails with "TypeError: Failed to fetch", the most common cause is CORS; Cloudflare R2 responses must include CORS headers (Access-Control-Allow-Origin) to allow direct browser fetches.

	Options to fix it:

	- Add a Cloudflare Worker proxy that forwards the request to your R2.dev URL and adds the necessary CORS headers. Example Worker code:

	```js
	addEventListener("fetch", event => {
		event.respondWith(handle(event.request))
	})

	async function handle(request) {
		const url = new URL(request.url)
		// route: https://your-domain.example.com/r2/<bucket-path>
		const path = url.pathname.replace(/^\/r2\//, "")
		const target = `https://pub-5028263d95314adf96c555f4bbb022f0.r2.dev/${path}`

		// Forward the request to R2
		const res = await fetch(target, { method: request.method })

		const headers = new Headers(res.headers)
		headers.set("Access-Control-Allow-Origin", "*")
		headers.set("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS")
		headers.set("Access-Control-Allow-Headers", "*")

		if (request.method === "OPTIONS") {
			return new Response(null, { status: 204, headers })
		}

		return new Response(res.body, { status: res.status, headers })
	}
	```

	Deploy that Worker and set `prefixUrl` in `public/devices.toml` to your worker route (for example `https://your-domain.example.com/r2`). This will proxy requests and add the CORS headers required for browser fetches.

	- Alternatively, if your upload process can set the `Access-Control-Allow-Origin` header on objects in R2 directly, ensure it's set to `*` or your app origin.

	If you're unsure whether CORS is the problem, open DevTools → Console and check for messages like: "Access to fetch at 'https://...' from origin 'http://localhost:5173' has been blocked by CORS policy". If you see that, use the Worker approach above or adjust bucket headers.
### routing

- routes are under pages
- nested routes are in subfolders: "nested/route" -> /pages/nested/route.tsx

### references

- research: https://chatgpt.com/share/693b1bc7-db84-8011-9378-402b30fcb954
- cloudflare 10gb free tier: https://www.cloudflare.com/de-de/developer-platform/products/r2/

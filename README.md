# bhano-starter-template

This is a somewhat opinionated starter template for the BHANO Stack (Bun, HTMX, Alpine, Hono).

More info about the above technologies can be found in their documentation.
Bun is the runtime.  Hono is the backend framework.  Hono JSX is the templating engine.  HTMX is for server-side interactivity.  Alpine is for client-side interactivity. 

This starter template includes the following:

- The latest versions of HTMX and Alpine, self-hosted, in the /static/lib directory.  Self-hosting is preferred over the use of CDNs for production applications.
- Scaffolds for a home route, partials routes, and API routes in Hono
- Generic Hono JSX components for Head and Body - the Head component includes all script tags for HTMX and Alpine.
- Sample HTMX and Alpine mini-apps: a counter demonstrating the use of Alpine, and a form whereyou enter your name and click the button and the Hello message is changed to Hello, [name]! demonstrating the use of HTMX with Hono partials.
- Components for the above mini-apps in Hono JSX format
- A Typescript config
- A Nodemon config for hot reload.  If you do not have Nodemon installed globally, install Nodemon in the project before running.
- A basic Tailwind config for Tailwind use.
- A Tailwind compile script in package.json that takes static/css/input.css and compiles it to static/css/output.css.  A link tag for output.css is included in the Head component, allowing the use of Tailwind via pre-compiled utility classes in output.css.
- An example .env template including the POSTGRES_URL variable expected by Bun SQL for Postgres.

After cloning the repo, type ``bun install`` to install all dependencies.

The Bun lockfile used for this template is for Bun 1.2.  If you're on an earlier version of Bun you'll need to delete it before running bun install to create a lockb file.

To run the dev server:
bun run dev

This starts nodemon, which runs the Tailwind compile script and starts/restarts the dev server on every change.

Even with hot reload, you will have to refresh your browser to see changes.  Looking for a fix for this issue currently.

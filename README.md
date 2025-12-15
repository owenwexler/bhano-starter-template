# bhano-starter-template

This is a somewhat opinionated starter template for the BHANO Stack (Bun, HTMX, Alpine, Hono).

More info about the above technologies can be found in their documentation.
Bun is the runtime.  Hono is the backend framework.  Hono JSX is the templating engine.  HTMX is for server-side interactivity.  Alpine is for client-side interactivity. 

### What's in the template?
This starter template includes the following:

- The latest versions of HTMX and Alpine, self-hosted, in the /static/lib directory.  Self-hosting is preferred over the use of CDNs for production applications.
- Scaffolds for a home route, partials routes, and API routes in Hono
- Generic Hono JSX components for Head and Body - the Head component includes all script tags for HTMX and Alpine as well as the compiled CSS from Tailwind.
- Sample HTMX and Alpine mini-apps: a counter demonstrating the use of Alpine, and a form whereyou enter your name and click the button and the Hello message is changed to Hello, [name]! demonstrating the use of HTMX with Hono partials.
- Components for the above mini-apps in Hono JSX format
- A Typescript config
- A Nodemon config for hot reload.  If you do not have Nodemon installed globally, install Nodemon in the project before running.
- A basic Tailwind config for Tailwind use.
- A Tailwind compile script in package.json that takes static/css/input.css and compiles it to static/css/output.css.  A link tag for output.css is included in the Head component, allowing the use of Tailwind via pre-compiled utility classes in output.css.
- An example .env template including the POSTGRES_URL variable expected by Bun SQL for Postgres and the REDIS_URL variable expected by Bun REDIS.
- A typed environment variable module that validates all environment variables and loads them into a typed object which is then imported from env.ts
- A typedefs folder containing a single typedef for Env
- A Dockerfile used for deployment to Platforms As A Service (PAAS), confirmed to work with Render and DigitalOcean App Platform so far

### How to install and use
After cloning the repo, type ``bun install`` to install all dependencies.

To run the dev server:
```bun run dev```

This starts nodemon, which runs the Tailwind compile script (more on this in the Tailwind section) and starts/restarts the dev server on every change.
Even with hot reload, you will have to refresh your browser to see changes.  Looking for a fix for this issue currently.

There is also a build script that just runs the compile:tailwind script and a start script that runs the app without Nodemon, both used in production by the Dockerfile.

### Tailwind
The way Tailwind is handled in the BHANO stack is that Tailwind classes are read from all the TSX files in the project as specified in the Tailwind config file, and uses a compile script to compile them all ahead of time to output.css, which is then read in a script tag in the project's head.  Both the dev script and the Dockerfile run the Tailwind compile script before starting the server.

### REDIS 
This template uses the built-in Bun REDIS module and initalizes the REDIS instance in redis/redis.ts using the REDIS_URL environment variable.  There is also a ```checkCache``` helper function in the same directory thattakes in an args object with a key, time, and callback function.  ```checkCache``` checks the REDIS cache for a cached value at the passed-in key and returns it if it exists, and if it does not exist, runs the callback function and writes the result to the cache at the specified key for the specified time and returns the result as well.  It is recommended to use this function for any interactions with the REDIS cache.

### POSTGRES/Databases
This template uses the Bun SQL module which works with POSTGRES, SQLite, and MySQL.  If using POSTGRES, make sure the POSTGRES_URL environment variable is filled out with the proper URL, ```import { sql } from bun``` and use the sql`` command to use SQL statements.  See Bun documentation for more details. 

### Lockfile and compatibility
The Bun lockfile used for this template is for Bun 1.2 and later.  If you're on an earlier version of Bun you'll need to delete it before running bun install to create a lockb file.
Bun 1.3 or later is required to use everything included in this starter repo.  
The built-in Bun REDIS package is not available in any Bun version prior to 1.3.  The ioredis package can be used as a drop-in replacement.
The built-in Bun SQL package is not available in any Bun version prior to 1.2.  The PostgresJS package can be used as a drop-in replacement.
I recommend using Bun 1.3 or later with this template.

### How to use the typed environment variable module:
Places you will need to add any new environment variables:
.env
.env.example
typedefs/Env.ts (add the type definition)
env/environmentVariableList.ts (add it to the array in single quotes)

Import the env object from env/env.ts and read environment variables from this env object instead of ```process.env``` or ```Bun.env```.

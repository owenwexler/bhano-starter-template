import { Hono } from 'hono';
import { serveStatic } from 'hono/bun';
import partialsRoute from './routes/partialsRoute';
import Head from './components/Head/Head';
import Body from './components/Body/Body';
import apiRoute from './routes/apiRoute';
import Loading from './components/Loading/Loading';

const app = new Hono();

app.use('/static/*', serveStatic({ root: './' }))

app.route('/partials', partialsRoute);
app.route('/api', apiRoute);

app.get('/', async (c) => {
  return c.html(
    <html lang="en">
      <Head title="BHANO Starter" />
      <Body>
        <main class="flex flex-col items-center justify-center bg-white text-black">
          <div
            id="main-container"
            class="container flex flex-col items-center justify-center px-4 py-10 space-y-8"
            hx-get="/partials/load"
            hx-trigger="load"
            hx-boost={true}
          >
            <Loading />
          </div>
        </main>
      </Body>
    </html>
  );
});

export default app;

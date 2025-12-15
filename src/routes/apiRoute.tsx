import { Hono } from 'hono';

const apiRoute = new Hono();

apiRoute.get('/', (c) => {
  return c.json({ text: 'Hello from API!' });
});

export default apiRoute;

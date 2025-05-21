import { Hono } from 'hono';
import { deleteTestUser } from '../db/models/user';

const apiRoute = new Hono();

apiRoute.get('/', (c) => {
  return c.json({ text: 'Hello from API!' });
});

export default apiRoute;

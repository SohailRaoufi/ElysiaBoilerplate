import Elysia from 'elysia';
import { authRoutes } from './modules/auth/auth.routes';
import clientRoutes from './modules/client/client.routes';
import { attachmentRoutes } from './modules/attachment/attachment.routes';

const appRoutes = new Elysia({ prefix: '/api/v1' })
  .use(authRoutes)
  .use(clientRoutes)
  .use(attachmentRoutes);

export default appRoutes;

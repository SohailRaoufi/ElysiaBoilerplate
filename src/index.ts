import Elysia from 'elysia';
import appRoutes from './app.routes';
import swaggerConfig from './config/swagger';
import { validationPlugin } from './config/validation';

const app = new Elysia()
  .use(validationPlugin)
  .use(swaggerConfig)
  .use(appRoutes);

app.listen(process.env.PORT || 3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);

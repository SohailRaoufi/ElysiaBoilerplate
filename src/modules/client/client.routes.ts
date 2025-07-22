import Elysia from 'elysia';
import { profileRoutes } from './profile/profile.routes';

const clientRoutes = new Elysia({ prefix: '/client' }).use(profileRoutes);

export default clientRoutes;

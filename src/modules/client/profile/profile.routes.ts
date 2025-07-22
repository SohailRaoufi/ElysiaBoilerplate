import { AuthPlugin } from '@/common/middleware/auth';
import Elysia from 'elysia';
import {
  UserProfileResponseDto,
  UserUpdateProfileDto,
} from './dto/profile.dto';
import { ChangePassword, UpdateProfile } from './profile.service';
import { UserChangePasswordDto } from './dto/change-password.dto';

export const profileRoutes = new Elysia({
  tags: ['profile'],
})
  .use(AuthPlugin)
  .group('/profile', (app) =>
    app

      /**
       * ---------------------------------------
       * Get Profile
       * ---------------------------------------
       */

      .get('', async ({ user }) => user, {
        response: {
          200: UserProfileResponseDto,
        },
        detail: {
          summary: 'Me',
        },
      })

      /**
       * ---------------------------------------
       * Update Profile
       * ---------------------------------------
       */

      .patch('', async ({ user, body }) => UpdateProfile(body, user.id), {
        body: UserUpdateProfileDto,
        detail: {
          summary: 'Me',
        },
      })

      /**
       * ---------------------------------------
       * Change Password
       * ---------------------------------------
       */

      .patch(
        '/change-password',
        async ({ user, body }) => ChangePassword(body, user),
        {
          body: UserChangePasswordDto,
          detail: {
            summary: 'Change Password',
          },
        }
      )
  );

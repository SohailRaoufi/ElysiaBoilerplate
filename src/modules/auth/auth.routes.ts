import Elysia from 'elysia';
import {
  confirmResetPassword,
  initiateResetPassword,
  login,
  register,
  resendOtp,
  verifyOtp,
} from './auth.service';
import { loginDto, loginResponseDto } from './dto/login.dto';
import { registerDto } from './dto/register.dto';
import { resendOtpDto, verifyOtpDto } from './dto/verify-otp.dto';
import {
  confirmResetPasswordDto,
  initiateResetPasswordDto,
} from './dto/forgot-password';

export const authRoutes = new Elysia({
  tags: ['auth'],
}).group('/auth', (app) =>
  app

    /**
     * ---------------------------------------
     * Login
     * ---------------------------------------
     */

    .post('/login', async ({ body }) => await login(body), {
      body: loginDto,
      response: {
        200: loginResponseDto,
      },
      detail: {
        summary: 'Login',
      },
    })

    /**
     * ---------------------------------------
     * Regiser
     * ---------------------------------------
     */

    .post('/register', async ({ body }) => await register(body), {
      body: registerDto,
      detail: {
        summary: 'Register',
      },
    })

    /**
     * --------------------------------------
     * Verify Otp
     * --------------------------------------
     */

    .post('/verify-otp', async ({ body }) => await verifyOtp(body), {
      body: verifyOtpDto,
      response: {
        200: loginResponseDto,
      },
      detail: {
        summary: 'Verify Otp',
      },
    })

    /**
     * --------------------------------------
     * Resend Otp
     * --------------------------------------
     */

    .post('/resend-otp', async ({ body }) => await resendOtp(body), {
      body: resendOtpDto,
      detail: {
        summary: 'Resend Otp',
      },
    })

    /**
     * --------------------------------------
     * Initiate Reset Password
     * --------------------------------------
     */

    .post(
      '/initiate-reset-password',
      async ({ body }) => await initiateResetPassword(body),
      {
        body: initiateResetPasswordDto,
        detail: {
          summary: 'Initiate Reset Password',
        },
      }
    )

    /**
     * --------------------------------------
     * Confirm Reset Password
     * --------------------------------------
     */

    .post(
      '/confirm-reset-password',
      async ({ body }) => await confirmResetPassword(body),
      {
        body: confirmResetPasswordDto,
        detail: {
          summary: 'Confirm Reset Password',
        },
      }
    )
);

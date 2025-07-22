import swagger from '@elysiajs/swagger';

const swaggerConfig = swagger({
  path: '/docs',
  exclude: ['/docs'],
  documentation: {
    info: {
      title: 'Elysia Boilerplate API',
      version: '1.0.0',
      description: 'Boilerplate Development',
    },
    servers: [
      {
        url: process.env.HOST || 'http://localhost:3000',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  autoDarkMode: true,
});

export default swaggerConfig;

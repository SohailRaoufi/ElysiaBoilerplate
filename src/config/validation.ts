import { Elysia } from 'elysia';

type ValidationErrorDetail = {
  path?: string;
  message?: string;
  summary?: string;
};

export const validationPlugin = (app: Elysia) =>
  app.onError(({ code, error, set }) => {
    if (code === 'VALIDATION') {
      set.status = 422;

      // Type guard: is this an error detail with path or summary?
      const isDetail = (obj: unknown): obj is ValidationErrorDetail =>
        typeof obj === 'object' &&
        obj !== null &&
        ('message' in obj || 'summary' in obj);

      // Safely get error details array
      const details: unknown[] = Array.isArray((error as any)?.all)
        ? (error as any).all
        : [error];

      // Map details into simplified error objects
      const errors = details.map((detail) => {
        if (!isDetail(detail)) {
          return { field: undefined, message: 'Invalid input' };
        }

        // Extract field from path if available, else undefined
        const field =
          typeof detail.path === 'string'
            ? detail.path.split('/')?.[1]
            : undefined;

        // Message fallback from message or summary
        const message = detail.message ?? detail.summary ?? 'Invalid input';

        return { field, message };
      });

      return {
        statusCode: 422,
        type: 'Unprocessable Entity',
        errors,
      };
    }

    return error;
  });

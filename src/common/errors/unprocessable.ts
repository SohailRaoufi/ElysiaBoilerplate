type ErrorField = {
  message: string;
  field: string;
};

export class UnprocessableException extends Error {
  status = 422;
  errors: ErrorField[];

  constructor(error: ErrorField | ErrorField[]) {
    super();
    this.name = 'UnprocessableException';
    this.errors = Array.isArray(error) ? error : [error];
  }

  toResponse() {
    return {
      status: this.status,
      message: 'Unprocessable Entity',
      errors: this.errors,
    };
  }
}

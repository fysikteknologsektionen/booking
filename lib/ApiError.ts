export default class ApiError extends Error {
  statusCode: number;

  constructor(
    statusCode: number = 500,
    message: string = "Internal server error",
    options?: ErrorOptions
  ) {
    super(message, options);
    this.statusCode = statusCode;
  }
}

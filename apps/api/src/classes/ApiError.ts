class ApiError extends Error {
  public readonly statusCode: number
  public readonly code: string

  constructor(message: string, statusCode: number, code: string = 'API_ERROR') {
    super(message)
    this.statusCode = statusCode
    this.code = code

    // Mempertahankan stack trace yang benar (fitur bawaan V8 Engine)
    Object.setPrototypeOf(this, new.target.prototype)
    Error.captureStackTrace(this, this.constructor)
  }
}

export { ApiError }

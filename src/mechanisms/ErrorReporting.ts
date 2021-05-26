class ErrorReporting {
  public captureError(e: unknown): void;
  public captureError(e: unknown, context: Record<string, unknown>): void;
  public captureError(e: unknown, context?: Record<string, unknown>): void {
    console.error(e, context);
  }

  public emitWarn(message: string): void;
  public emitWarn(message: string, context: Record<string, unknown>): void;
  public emitWarn(message: string, context?: Record<string, unknown>): void {
    console.warn(message, context);
  }
}

export default new ErrorReporting();

// Centralized error logging utility
// Usage: logError(error, context)

export function logError(error: unknown, context?: string) {
  if (context) {
    // Add timestamp and context for better traceability
    // eslint-disable-next-line no-console
    console.error(`[${new Date().toISOString()}] [${context}]`, error);
  } else {
    // eslint-disable-next-line no-console
    console.error(`[${new Date().toISOString()}]`, error);
  }
  // Optionally, send error to a remote logging service here
}

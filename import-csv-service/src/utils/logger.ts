export const logger = (method: 'log' | 'warn' | 'error', handler: string) => (message: string) => {
  console[method](`[${method.toUpperCase()}] ${handler}: ${message}`)
}

export const loggers = (handler: string) => {
  return {
    LOG: logger('log', handler),
    WARN: logger('warn', handler),
    ERROR: logger('error', handler),
  }
}

export function errorMessage(e: any) {
  const message = e.message || e.errorMessage || JSON.stringify(e, null, 2)
  return String(message)
}

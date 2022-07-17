export const logger = (method: 'log' | 'warn' | 'error', handler: string) => (msg: string) => {
  console[method](`${handler}: ${msg}`)
}

export const loggers = (handler: string) => {
  return {
    LOG: logger('log', handler),
    WARN: logger('warn', handler),
    ERROR: logger('error', handler),
  }
}

export function errorMessage(e: any) {
  const error = e.message || e.errorMessage || JSON.stringify(e, null, 2)
  const stack = e.stack || e.trace
  return `ERROR: ${error}\n${stack}`
}

export const handler = (dirname: string) => {
  return `${dirname.split(process.cwd())[1].substring(1).replace(/\\/g, '/')}/handler.main`
}

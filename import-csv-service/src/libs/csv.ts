import { Readable } from 'stream'
import { loggers } from '../utils'
import csvParser from 'csv-parser'

const { LOG } = loggers('parseCsvStream')

export const parseCsvStream = (stream: Readable) => {
  return new Promise((resolve, reject) => {
    const data = []
    stream
      .pipe(csvParser())
      .on('error', reject)
      .on('data', (record) => {
        LOG(`Record: ${record}`)
        data.push(record)
      })
      .on('end', () => {
        resolve(data)
      })
  })
}

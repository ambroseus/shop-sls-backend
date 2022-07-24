import { Pool, QueryConfig, QueryResult } from 'pg'

const pool = new Pool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
})

export async function dbQuery<Row = any>(query: string | QueryConfig<any[]>, values?: any[]) {
  const client = await pool.connect()
  let res: QueryResult<Row>
  try {
    await client.query('BEGIN')
    try {
      res = await client.query(query, values)
      await client.query('COMMIT')
    } catch (err) {
      await client.query('ROLLBACK')
      throw err
    }
  } finally {
    client.release()
  }
  return res
}

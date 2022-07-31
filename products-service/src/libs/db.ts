import { Pool, QueryConfig, QueryResult, PoolClient } from 'pg'

const pool = new Pool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
})

export async function dbTransaction<Result = any>(execFn: (client: PoolClient) => Promise<Result>) {
  const client = await pool.connect()
  let res: Result
  try {
    await client.query('BEGIN')
    try {
      res = await execFn(client)
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

export async function dbQuery<Row = any>(query: string | QueryConfig<any[]>, values?: any[]) {
  return await dbTransaction<QueryResult<Row>>((client) => client.query(query, values))
}

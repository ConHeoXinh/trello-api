import { env } from '~/config/environment'

import { MongoClient, ServerApiVersion } from 'mongodb'

let trelloDatabaseInstane = null
const mongoClientInstence = new MongoClient(env.MONGODB_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true
  }
})

export const CONNECT_DB = async () => {
  await mongoClientInstence.connect()

  trelloDatabaseInstane = mongoClientInstence.db(env.DATABASE_NAME)
}

export const GET_DB = () => {
  if (!trelloDatabaseInstane) throw new Error('Must connect to Database first!')
  return trelloDatabaseInstane
}

export const CLOSE_DB = async () => {
  await mongoClientInstence.close()
}
/* eslint-disable no-console */

import express from 'express'
import exitHook from 'async-exit-hook'
import { CONNECT_DB, GET_DB, CLOSE_DB } from '~/config/mongodb'
import { env } from '~/config/environment'
import { APIs_V1 } from '~/routes/v1'
import cors from 'cors'
import { corsOptions } from './config/cors'

const START_SERVER = () => {
  const app = express()

  app.use(cors(corsOptions))

  const hostname = env.APP_HOST
  const port = env.APP_PORT

  app.use(express.json())

  app.use('/v1', APIs_V1)

  app.listen(port, hostname, () => {
    // eslint-disable-next-line no-console
    console.log(`Hello ${env.AUTHOR}, I am running at ${hostname}:${port}`)
  })

  exitHook(() => {
    console.log('1. Disconnecting database ...')
    CLOSE_DB()
    console.log('2. Disconnected database ...')
  })
}
//IIFE
(async () => {
  try {
    console.log('1. Connecting database ...')
    await CONNECT_DB()
    console.log('2. Connected database ...')
    START_SERVER()
  } catch (error) {
    console.log('object :>> ', error)
    process.exit(0)
  }
})()

// CONNECT_DB()
//   .then(() => console.log('Connect to MongoDB'))
//   .then(() => START_SERVER())
//   .catch(error => {
//     console.log('object :>> ', error)
//     process.exit(0)
//   })
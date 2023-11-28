/* eslint-disable no-console */

import express from 'express'
import exitHook from 'async-exit-hook'
import { CONNECT_DB, GET_DB, CLOSE_DB } from '~/config/mongodb'
import { env } from '~/config/environment'

const START_SERVER = () => {
  const app = express()

  const hostname = env.APP_HOST
  const port = env.APP_PORT

  app.get('/', (req, res) => {
    res.end('<h1>Hello World!</h1><hr>')
  })

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
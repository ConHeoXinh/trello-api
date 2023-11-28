import express from 'express'
import { StatusCodes } from 'http-status-codes'
import { boardRoutes } from '~/routes/v1/boardRoute'

const Router = express.Router()

Router.get('/status', (req, res) => {
  res.status(StatusCodes.OK).json({ messange: 'API V1 are ready' })
})

Router.use('/boards', boardRoutes)

export const APIs_V1 = Router
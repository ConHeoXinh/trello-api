import ApiError from '~/utils/ApiError'
import { slugify } from '~/utils/formatters'

import { boardModel } from '~/models/boardModel'

const createNew = async (reqBody) => {
  try {
    const newBoard = {
      ...reqBody,
      slug: slugify(reqBody.title)
    }

    const createdBoard = await boardModel.createNew(newBoard)

    // const getNewBoard = await boardModel.findOneById(createdBoard.insertedId)

    return createdBoard
  } catch (error) {
    throw new Error(error)
  }
}

export const boardService = {
  createNew
}
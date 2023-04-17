import type { Person } from '../interfaces'
import { people } from '../mocks'

export const getPeople = async (): Promise<Person[]> => {
  return await new Promise((resolve) => {
    resolve(people)
  })
}

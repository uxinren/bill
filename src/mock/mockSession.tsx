import { faker } from '@faker-js/faker'

export const mockSession: Mock = (config) => {
    return [200, {
      jwt: faker.random.word()
    }]
  }
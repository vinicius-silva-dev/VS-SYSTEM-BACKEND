import { InMemoryUser } from 'test/repository/in-memory-user'
import {beforeEach, describe, expect, it} from 'vitest'
import { FechUsersUseCase } from './fech-users-use-case'
import { User } from 'src/domain/entities/user-entiity'

let inMemoryUser: InMemoryUser
let sut: FechUsersUseCase
describe('Fech user', () => {
  beforeEach(() => {
    inMemoryUser = new InMemoryUser()

    sut = new FechUsersUseCase(inMemoryUser)
  })
  it('shoud be abble to fech a user', async () => {
    const user1 = User.create({
      name: 'Vinicius Silva',
      email: 'vinicius100@live.com',
      password: '123456',
      role: 'admin'
    })

    await inMemoryUser.create(user1)

    const user2 = User.create({
      name: 'Maria Silva',
      email: 'mari100@live.com',
      password: '123456',
      role: 'admin'
    })

    await inMemoryUser.create(user2)

    const users = await sut.execute()

    expect(users.users).toHaveLength(2)
  })
})
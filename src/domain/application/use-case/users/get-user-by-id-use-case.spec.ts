import { InMemoryUser } from 'test/repository/in-memory-user'
import {beforeEach, describe, expect, it} from 'vitest'
import { User } from 'src/domain/entities/user-entiity'
import { GetUserByIdUseCase } from './get-user-by-id-use-case'

let inMemoryUser: InMemoryUser
let sut: GetUserByIdUseCase
describe('Fech user', () => {
  beforeEach(() => {
    inMemoryUser = new InMemoryUser()

    sut = new GetUserByIdUseCase(inMemoryUser)
  })
  it('shoud be abble to fech a user', async () => {
    const user1 = User.create({
      name: 'Vinicius Silva',
      username: 'vinicius.silva',
      email: 'vinicius100@live.com',
      password: '123456',
      role: 'admin'
    })

    await inMemoryUser.create(user1)

    const user2 = User.create({
      name: 'Maria Silva',
      username: 'maria.silva',
      email: 'mari100@live.com',
      password: '123456',
      role: 'admin'
    })

    await inMemoryUser.create(user2)

    const users = await sut.execute({id: user1.id.toString()})

    expect(users.users).toEqual(
      expect.objectContaining({
        email: 'vinicius100@live.com',
      })
    )
  })
})
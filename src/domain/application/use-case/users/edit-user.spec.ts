import { InMemoryUser } from 'test/repository/in-memory-user'
import {beforeEach, describe, expect, it} from 'vitest'
import { EditUserUseCase } from './edit-user-use-case'
import { User } from 'src/domain/entities/user-entiity'

let inMemoryUser: InMemoryUser
let sut: EditUserUseCase
describe('Edit user', () => {
  beforeEach(() => {
    inMemoryUser = new InMemoryUser()

    sut = new EditUserUseCase(inMemoryUser)
  })
  it('shoud be abble to edit a user', async () => {
    const user = User.create({
      name: 'Vinicius Silva',
      email: 'vinicius100@live.com',
      password: '123456',
      role: 'admin'
    })

    await inMemoryUser.create(user)

    await sut.execute({
      id: user.id.toString(),
      email: 'vinicius100@live.com',
      password: '654321',
      role: 'admin'
    })
    expect(inMemoryUser.items[0]).toEqual(
      expect.objectContaining({
        password: '654321'
      })
    )
  })
})
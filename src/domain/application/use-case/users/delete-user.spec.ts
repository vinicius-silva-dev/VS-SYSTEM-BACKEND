import { InMemoryUser } from 'test/repository/in-memory-user'
import {beforeEach, describe, expect, it} from 'vitest'
import { DeleteUserUseCase } from './delete-user-use-case'
import { User } from 'src/domain/entities/user-entiity'

let inMemoryUser: InMemoryUser
let sut: DeleteUserUseCase
describe('Delete user', () => {
  beforeEach(() => {
    inMemoryUser = new InMemoryUser()

    sut = new DeleteUserUseCase(inMemoryUser)
  })
  it('shoud be abble to delete a user', async () => {
    const user = User.create({
      name: 'Vinicius Silva',
      username: 'vinicius.silva',
      email: 'vinicius100@live.com',
      password: '123456',
      role: 'admin'
    })

    await inMemoryUser.create(user)

    await sut.execute({
      id: user.id.toString()
    })
    expect(inMemoryUser.items).toHaveLength(0)
  })
})
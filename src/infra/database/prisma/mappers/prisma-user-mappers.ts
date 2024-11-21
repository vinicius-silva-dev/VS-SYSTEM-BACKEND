import {Prisma, User as PrismaUser} from '@prisma/client'
import { UniqueEntityId } from 'core/unique-entity-id'
import { User } from 'src/domain/entities/user-entiity'

export class PrismaUserMappers {
  static toDomain(raw: PrismaUser) {
    return User.create({
      name: raw.name,
      username: raw.username,
      email: raw.email,
      password: raw.password,
      role: raw.role
    }, new UniqueEntityId(raw.id))
  }

  static toPrisma(user: User): Prisma.UserCreateInput {
    return {
      id: user.id.toString(),
      name: user.name,
      username: user.username,
      email: user.email,
      password: user.password,
      role: user.role,
    }
  }
}
import { User } from "@/domain/entities/user-entiity";
import { PrismaUserMappers } from "@/infra/database/prisma/mappers/prisma-user-mappers";

export async function user() {

  const createUser = User.create({
    name: 'Fulano de Tal',
    email: 'fulano@gmail.com',
    password: '123456',
    username: 'user.test',
    role: 'admin',
  })
  
  const data = await PrismaUserMappers.toPrisma(createUser)
  
  return data

}
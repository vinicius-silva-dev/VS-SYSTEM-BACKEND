import { PrismaService } from "@/infra/database/prisma/prisma.service";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";



export async function login(user: string, password: string) {
  let prisma: PrismaService

  try {
    const findUser = await prisma.user.findFirst({
      where: {
        username: user
      }
    })

    if (!findUser) {
      throw new Error('Usuário não existe.')
    }

    const validatePassword = await compare(password, findUser.password)

    if (!validatePassword) {
      throw new Error('Senha incorreta.')
    }

    const token = await sign({id: findUser.id}, process.env.SECRET_KEY)

    return {
      token
    }
  } catch (error) {
    return error
  }
}
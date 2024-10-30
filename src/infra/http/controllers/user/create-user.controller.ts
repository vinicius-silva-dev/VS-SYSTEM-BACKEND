import { CreateUserUseCase } from "src/domain/application/use-case/users/create-user-use-case";
import { Body, Controller, HttpCode, Post } from "@nestjs/common";
import { hash } from "bcrypt";
import { z } from "zod";

const userSchema = z.object({
  name: z.string(),
  email: z.string(),
  password: z.string(),
  role: z.enum(['admin', 'padrao']).default("padrao")
})

type User = z.infer<typeof userSchema>

@Controller('/user')
export class CreateUserController {
  constructor(private createUserUseCase: CreateUserUseCase) {}

  @Post()
  @HttpCode(201)
  async createUser(@Body() body: User) {
    const {name, email, password, role} = body

    const result = await this.createUserUseCase.execute({
      name,
      email,
      password: await hash(password, 8),
      role
    })

    if (!result) {
       throw new Error('Não foi possível cadastrar o usuário!')
    }

  }
}
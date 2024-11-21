import { EditUserUseCase } from "src/domain/application/use-case/users/edit-user-use-case";
import { Body, Controller, HttpCode, Param, Put, UseGuards } from "@nestjs/common";
import { hash } from "bcrypt";
import { AuthGuard } from "@/infra/auth/auth.guard";
import { z } from "zod";

const userSchema = z.object({
  id: z.string(),
  email: z.string(),
  password: z.string(),
  role: z.enum(['admin', 'padrao']).default("padrao")
})

type User = z.infer<typeof userSchema>

@Controller('/user/:id')
export class EditUserController {
  constructor(private editUserUseCase: EditUserUseCase) {}

  @Put()
  @UseGuards(AuthGuard)
  @HttpCode(201)
  async editUser(
    @Param('id') id: string,
    @Body() body: User
  ) {
    const { email, password, role} = body
  
    const result = await this.editUserUseCase.execute({
      id,
      email,
      password: await hash(password, 8),
      role
    })

    if (!result) {
       throw new Error('Não foi possível cadastrar o usuário!')
    }

  }
}
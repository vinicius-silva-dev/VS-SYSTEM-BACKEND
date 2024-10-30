import { AuthenticateUseCase } from "@/domain/application/use-case/users/authentica-use-case";
import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { z } from "zod";

const userSchema = z.object({
  email: z.string(),
  password: z.string()
})

type User = z.infer<typeof userSchema>

@Controller('login')
export class AuthenticateController {
  constructor(
    private authenticateUseCase: AuthenticateUseCase,

  ) { }

  @Post()
  @HttpCode(HttpStatus.OK)
  async authenticate(@Body() body: User): Promise<{ access_token: string }> {
    const { email, password } = body

    const token = await this.authenticateUseCase.execute({ email, password })

    if (!token) {
      throw new Error('Usuário não encontrado.')
    }
    return {
      access_token: token.token
    }
  }
}
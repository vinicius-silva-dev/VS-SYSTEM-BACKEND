import { GetUserByIdUseCase } from "@/domain/application/use-case/users/get-user-by-id-use-case";
import { User } from "@/domain/entities/user-entiity";
import { AuthGuard } from "@/infra/auth/auth.guard";

import { Controller, Get, HttpCode, Param, UseGuards } from "@nestjs/common";
// import { AuthGuard } from "@nestjs/passport";


@Controller('/user/:id')
export class GetUserByIdController {
  constructor(private getUserUseCase: GetUserByIdUseCase) {}

  @Get()
  @UseGuards(AuthGuard)
  @HttpCode(200)
  async getUsers(@Param('id') id: string,): Promise<User> {
    const users = await this.getUserUseCase.execute({id})

    if (!users) {
      throw new Error('Usuários não encontrado.')
    }

    return users.users
  }
}
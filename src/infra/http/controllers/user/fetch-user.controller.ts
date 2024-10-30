import { FechUsersUseCase } from "@/domain/application/use-case/users/fech-users-use-case";
import { User } from "@/domain/entities/user-entiity";
import { AuthGuard } from "@/infra/auth/auth.guard";

import { Controller, Get, HttpCode, UseGuards } from "@nestjs/common";
// import { AuthGuard } from "@nestjs/passport";


@Controller('user')
export class FetchUserController {
  constructor(private fetchUserUseCase: FechUsersUseCase) {}

  @Get()
  @UseGuards(AuthGuard)
  @HttpCode(200)
  async fetchUsers(): Promise<User[]> {
    const users = await this.fetchUserUseCase.execute()

    if (!users) {
      throw new Error('Usuários não encontrado.')
    }

    return users.users

  }
}
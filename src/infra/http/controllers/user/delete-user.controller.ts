import { DeleteUserUseCase } from "src/domain/application/use-case/users/delete-user-use-case";
import {Controller, Delete, HttpCode, Param, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@/infra/auth/auth.guard";


@Controller('/user/:id')
export class DeleteUserController {
  constructor(private deleteUserUseCase: DeleteUserUseCase) {}

  @Delete()
  @UseGuards(AuthGuard)
  @HttpCode(204)
  async deleteUser(
    @Param('id') id: string,
  ) {

    const result = await this.deleteUserUseCase.execute({
      id,
    })

    if (!result) {
       throw new Error('Não foi possível deletar o usuário!')
    }

  }
}
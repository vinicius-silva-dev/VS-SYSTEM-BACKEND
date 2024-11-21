import { FetchProdutosUseCase } from "@/domain/application/use-case/produtos/fetch-produtos-use-case";
import { AuthGuard } from "@/infra/auth/auth.guard";
import { Controller, Get, HttpCode, UseGuards } from "@nestjs/common";


@Controller('/produto')
export class FetchProdutoController {
  constructor(
    private fetchProdutoUseCase: FetchProdutosUseCase
  ) {}

  @Get()
  @UseGuards(AuthGuard)
  @HttpCode(200)
  async editProduto() {
    try {
      const produtos = await this.fetchProdutoUseCase.execute()

      return produtos

    } catch (error) {
      console.log(error)
      return error
    }


  }
}
import { ProdutoRepository } from "@/domain/application/repository/product-repository";
import { DeleteProdutoUseCase } from "@/domain/application/use-case/produtos/delete-produto-use-case";
import { AuthGuard } from "@/infra/auth/auth.guard";
import { Controller, Delete, HttpCode, Param, UseGuards } from "@nestjs/common";



@Controller('/produto/:id')
export class DeleteProdutoController {
  constructor(
    private deleteProdutoUseCase: DeleteProdutoUseCase,
    private produtoRepository: ProdutoRepository
  ) {}

  @Delete()
  @UseGuards(AuthGuard)
  @HttpCode(204)
  async deleteProduto(@Param('id') id: string) {

    const produto = await this.produtoRepository.findById(id)

    if (!produto) {
      throw new Error('Produto não encontrado.')
    }

    await this.deleteProdutoUseCase.execute({
      id
    })
  }
}
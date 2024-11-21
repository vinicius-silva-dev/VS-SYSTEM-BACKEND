import { ProdutoRepository } from "@/domain/application/repository/product-repository";
import { EditProdutoUseCase } from "@/domain/application/use-case/produtos/edit-produto-use-case";
import { AuthGuard } from "@/infra/auth/auth.guard";
import { Body, Controller, HttpCode, Put, UseGuards } from "@nestjs/common";
import { z } from "zod";

const produtoSchema = z.object({
  id: z.string(),
  descricao: z.string(),
  categoria: z.string(),
  ativo: z.boolean(),
  tipoProduto: z.string(),
  unidadeMedida: z.string(),
  custoMercadoria: z.string(),
  precoVenda: z.string()
})

type Produto = z.infer<typeof produtoSchema>

@Controller('/produto')
export class EditProdutoController {
  constructor(
    private editProdutoUseCase: EditProdutoUseCase,
    private produtoRepository: ProdutoRepository
  ) {}

  @Put()
  @UseGuards(AuthGuard)
  @HttpCode(201)
  async editProduto(@Body() body: Produto) {
    const {
      id,
      descricao,
      categoria,
      ativo,
      tipoProduto,
      unidadeMedida,
      custoMercadoria,
      precoVenda
    } = body

    const produto = await this.produtoRepository.findById(id)

    if (!produto) {
      throw new Error('Produto não encontrado.')
    }

    await this.editProdutoUseCase.execute({
      id,
      descricao,
      categoria,
      ativo,
      tipoProduto,
      unidadeMedida,
      custoMercadoria,
      precoVenda
    })
  }
}

import { CreateProdutoUseCase } from "@/domain/application/use-case/produtos/create-produtos-use-case";
import { AuthGuard } from "@/infra/auth/auth.guard";
import { Body, Controller, HttpCode, Post, UseGuards } from "@nestjs/common";

import { z } from "zod";

const produtoSchema = z.object({
  codigo: z.number(),
  codigoBarras: z.number(),
  codigoNcm: z.number(),
  descricao: z.string(),
  categoria: z.string(),
  ativo: z.boolean().default(true),
  tipoProduto: z.string(),
  unidadeMedida: z.enum(["UN", "KG", "LT", "CX"]).default("UN"),
  custoMercadoria: z.string(),
  precoVenda: z.string(),
  estoqueInicial: z.number(),
 
})

type Produto = z.infer<typeof produtoSchema>

@Controller('/produto')
export class CreateProdutoController {
  constructor(private createProdutoUseCase: CreateProdutoUseCase) {}

  @Post()
  @UseGuards(AuthGuard)
  @HttpCode(201)
  async createProduto(@Body() body: Produto) {
    const {
      codigo,
      codigoBarras,
      codigoNcm,
      descricao,
      categoria,
      ativo,
      tipoProduto,
      unidadeMedida,
      custoMercadoria,
      precoVenda,
      estoqueInicial
    } = body

    const result = await this.createProdutoUseCase.execute({
      codigo,
      codigoBarras,
      codigoNcm,
      descricao,
      categoria,
      ativo,
      tipoProduto,
      unidadeMedida,
      custoMercadoria,
      estoqueInicial,
      precoVenda,
      createdAt: new Date()
    })

    if (!result) {
       throw new Error('Não foi possível cadastrar o usuário!')
    }

  }
}
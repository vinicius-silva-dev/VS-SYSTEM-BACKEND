import { EstoqueAreaVendasRepository } from "@/domain/application/repository/estoque-area-vendas-repository";
import { ProdutoRepository } from "@/domain/application/repository/product-repository";
import { Injectable } from "@nestjs/common";

import { EstoqueAreaVendas } from "@/domain/entities/estoque-area-venda-entity";

interface CreateProdutoEstoqueAreaVendasRequest {
  codProd: number
  descricao: string
  quantidade: number
}

@Injectable()
export class CreateProdutoEstoqueAreaVendasUseCase {
  constructor(
    private estoqueAreaVendasRepository: EstoqueAreaVendasRepository,
    private produtoRepository: ProdutoRepository
  ) {}

  async execute({
    codProd,
    quantidade
  }: CreateProdutoEstoqueAreaVendasRequest) {
    const findProduto = await this.produtoRepository.findByCodProd(codProd)

    if (!findProduto) {
      throw new Error('Produto não cadastrado!')
    }

    const createProd = EstoqueAreaVendas.create({
      codProd,
      descricao: findProduto.descricao,
      quantidade,
      createdAt: new Date()
    })

    await this.estoqueAreaVendasRepository.create(createProd)
  }
}
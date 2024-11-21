

import { Produto } from "src/domain/entities/produto-entity";
import { ProdutoRepository } from "../../repository/product-repository";
import { Injectable } from "@nestjs/common";


interface EditProdutoRequest {
  id: string
  descricao: string
  categoria: string
  ativo: boolean
  tipoProduto: string
  unidadeMedida: string
  custoMercadoria: string
  precoVenda: string
  estoque_inicial?: number | null
  estoque_minimo?: number | null
  estoque_maximo?: number | null
}

type EditProdutoResponse = {
  produto: Produto
}

@Injectable()
export class EditProdutoUseCase {
  constructor(
    private produtoRepository: ProdutoRepository
  ) { }

  async execute({
    id,
    descricao,
    categoria,
    ativo,
    tipoProduto,
    unidadeMedida,
    custoMercadoria,
    precoVenda,
  }: EditProdutoRequest): Promise<EditProdutoResponse> {

    const produto = await this.produtoRepository.findById(id)

    if (!produto) {
      throw new Error('Produto not found!!')
    }

    produto.descricao = descricao
    produto.categoria = categoria
    produto.ativo = ativo
    produto.tipo_produto = tipoProduto
    produto.unidade_medida = unidadeMedida
    produto.custo_mercadoria = custoMercadoria
    produto.preco_venda = precoVenda

    await this.produtoRepository.save(produto)

    return {
      produto
    }
  }
}
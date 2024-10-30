import { Injectable } from "@nestjs/common";
import { EstoqueRepository } from "../../repository/estoque-repository";
import { ProdutoRepository } from "../../repository/product-repository";
import { Estoque } from "src/domain/entities/estoque-entity";

interface CreateProdutoEstoqueRequest {
  codProd: number
  estoqueDisponivel: number
  estoqueAreaVendas: number
}

@Injectable()
export class CreateProdutoEstoqueUseCase {
  constructor(
    private estoqueRepository: EstoqueRepository,
    private produtoRepository: ProdutoRepository
  ) {}

  async execute({
    codProd,
    estoqueDisponivel,
    estoqueAreaVendas
  }: CreateProdutoEstoqueRequest) {
    const findProduto = await this.produtoRepository.findByCodProd(codProd)

    if(!findProduto) {
      throw new Error('Produto não cadastrado!')
    }

    const createProd = Estoque.create({
      cod_prod: codProd,
      descricao: findProduto.descricao,
      estoque_contabil: estoqueDisponivel + estoqueAreaVendas,
      estoque_disponivel: estoqueDisponivel,
      estoque_area_vendas: estoqueAreaVendas,
      createdAt: new Date()
    })

    await this.estoqueRepository.create(createProd)
  }
}
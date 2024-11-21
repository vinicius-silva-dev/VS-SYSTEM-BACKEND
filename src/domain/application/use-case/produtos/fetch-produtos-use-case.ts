import { Injectable } from "@nestjs/common";
import { ProdutoRepository } from "../../repository/product-repository";

@Injectable()
export class FetchProdutosUseCase {
  constructor(private produtoRepository: ProdutoRepository) { }

  async execute() {
    const produtos = this.produtoRepository.findAll()

    if (!produtos) {
      throw new Error('Produtos not found!!')
    }

    return produtos
  }
}
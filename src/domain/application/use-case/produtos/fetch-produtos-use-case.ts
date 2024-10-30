import { ProdutoRepository } from "../../repository/product-repository";

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
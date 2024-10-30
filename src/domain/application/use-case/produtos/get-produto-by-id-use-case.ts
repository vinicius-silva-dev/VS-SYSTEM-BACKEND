import { Produto } from "src/domain/entities/produto-entity";
import { ProdutoRepository } from "../../repository/product-repository";

interface GetProdutoByIdRequest {
  id: string
}

type GetProdutoByIdResponse = {
  produto: Produto
}

export class GetProdutoByIdUseCase {
  constructor(private produtoRepository: ProdutoRepository) { }

  async execute({
    id
  }: GetProdutoByIdRequest): Promise<GetProdutoByIdResponse> {
    const produto = await this.produtoRepository.findById(id)

    if (!produto) {
      throw new Error('Produtos not found!!')
    }

    return {
      produto
    }

  }
}
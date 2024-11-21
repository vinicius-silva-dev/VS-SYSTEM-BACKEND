import { Injectable } from "@nestjs/common";
import { ProdutoRepository } from "../../repository/product-repository";


interface DeleteProdutoRequest {
  id: string
}

@Injectable()
export class DeleteProdutoUseCase {
  constructor(
    private produtoRepository: ProdutoRepository
  ) { }

  async execute({
    id,
  }: DeleteProdutoRequest): Promise<void> {

    const produto = await this.produtoRepository.findById(id)

    if (!produto) {
      throw new Error('Produto not found!!')
    }

    await this.produtoRepository.delete(id)

  }
}
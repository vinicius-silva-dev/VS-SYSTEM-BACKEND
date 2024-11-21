import { EstoqueAreaVendasRepository } from "@/domain/application/repository/estoque-area-vendas-repository";
import { Injectable } from "@nestjs/common";


interface EditProdutoEstoqueAreaVendasRequest {
  codProd: number
  descricao: string
  quantidade: number
}

@Injectable()
export class EditProdutoEstoqueAreaVendasUseCase {
  constructor(
    private estoqueDisponivelRepository: EstoqueAreaVendasRepository,
  ) {}

  async execute({
    codProd,
    descricao,
    quantidade
  }: EditProdutoEstoqueAreaVendasRequest) {
    const estoqueProd = await this.estoqueDisponivelRepository.findByCodProd(codProd)

    if(!estoqueProd) {
      throw new Error('Produto não cadastrado!')
    }

    estoqueProd.descricao = descricao
    estoqueProd.quantidade = quantidade
   

    await this.estoqueDisponivelRepository.save(estoqueProd)
  }
}
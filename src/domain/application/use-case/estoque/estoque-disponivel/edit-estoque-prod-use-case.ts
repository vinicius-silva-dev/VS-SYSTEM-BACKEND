import { EstoqueDisponivelRepository } from "@/domain/application/repository/estoque-disponivel-repository";
import { Injectable } from "@nestjs/common";


interface EditEstoqueProdEstoqueRequest {
  codProd: number
  descricao: string
  quantidade: number
}

@Injectable()
export class EditEstoqueProdEstoqueUseCase {
  constructor(
    private estoqueDisponivelRepository: EstoqueDisponivelRepository,
  ) {}

  async execute({
    codProd,
    descricao,
    quantidade
  }: EditEstoqueProdEstoqueRequest) {
    const estoqueProd = await this.estoqueDisponivelRepository.findByCodProd(codProd)

    if(!estoqueProd) {
      throw new Error('Produto não cadastrado!')
    }

    estoqueProd.descricao = descricao
    estoqueProd.quantidade = quantidade
   

    await this.estoqueDisponivelRepository.save(estoqueProd)
  }
}
import { Injectable } from "@nestjs/common";
import { EstoqueRepository } from "../../repository/estoque-repository";

interface EditEstoqueProdEstoqueRequest {
  codProd: number
  estoqueDisponivel: number
  estoqueAreaVendas: number
}

@Injectable()
export class EditEstoqueProdEstoqueUseCase {
  constructor(
    private estoqueRepository: EstoqueRepository,
  ) {}

  async execute({
    codProd,
    estoqueDisponivel,
    estoqueAreaVendas
  }: EditEstoqueProdEstoqueRequest) {
    const estoqueProd = await this.estoqueRepository.findByCodProd(codProd)

    if(!estoqueProd) {
      throw new Error('Produto não cadastrado!')
    }

    estoqueProd.estoque_disponivel = estoqueDisponivel
    estoqueProd.estoque_area_vendas= estoqueAreaVendas
   

    await this.estoqueRepository.save(estoqueProd)
  }
}
import { Injectable } from "@nestjs/common";
import { ProdutoRepository } from "../../../repository/product-repository";
import { EstoqueDisponivel } from "@/domain/entities/estoque-disponivel-entity";
import { EstoqueDisponivelRepository } from "@/domain/application/repository/estoque-disponivel-repository";

// import { readFile, readFileSync } from "fs";
// type CreateProdutoEstoqueDisponivelRequest = EstoqueDisponivel[]
type CreateProdutoEstoqueDisponivelRequest  = {
  nota: {
    codProd: number,
    descricao: string,
    quantidade: number
  }[]
}

// const nf: CreateProdutoEstoqueDisponivelRequest

// const xml = readFile('./../../../../../../xmltojson.json', "utf-8")

@Injectable()
export class CreateProdutoEstoqueDisponivelUseCase {
  constructor(
    private estoqueDisponivelRepository: EstoqueDisponivelRepository,
    private produtoRepository: ProdutoRepository
  ) { }

  async execute({nota}: CreateProdutoEstoqueDisponivelRequest) {
    // console.log(...nota)
    nota.forEach( async (item) => {
      const findProduto = await this.produtoRepository.findByCodProd(item.codProd)
  
      if (!findProduto) {
        throw new Error('Produto não cadastrado!')
      }

      const createProd = EstoqueDisponivel.create(
        {
          codProd: item.codProd ,
          descricao: item.descricao,
          quantidade: item.quantidade,
          createdAt: new Date()
        }
      )
      // console.log(createProd)
      await this.estoqueDisponivelRepository.create(createProd)
    })
    
  }
}
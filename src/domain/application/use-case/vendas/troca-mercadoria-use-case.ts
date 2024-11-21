import { Vendas } from "src/domain/entities/venda-entity";
import { VendasRepository } from "../../repository/vendas-repository";
import { EstoqueAreaVendasRepository } from "../../repository/estoque-area-vendas-repository";

interface TrocaMercadoriaRequest {
  vendaId: string
  items: number[]
  newItems: number[]
}

type TrocaMercadoriaResponse = {
  venda: Vendas
}

export class TrocaMercadoriaUseCase {
  constructor(
    private estoqueAreaVendasRepository: EstoqueAreaVendasRepository,
    private vendasRepository: VendasRepository
  ) {}

  async execute({
    vendaId,
    items,
    newItems
  }: TrocaMercadoriaRequest): Promise<TrocaMercadoriaResponse> {
    const findVenda = await this.vendasRepository.findById(vendaId)

    if(!findVenda) {
      throw new Error('Venda not found!')
    }

    await this.entradaEstoque(items)
    const removeItemToTroca = findVenda.items.filter(item => {
      const itemRemove = items.find(index => item === index)

      return item !== itemRemove
    })

    newItems.forEach(newProd => {
      removeItemToTroca.push(newProd)
    })

    
    findVenda.items.length = 0 // aqui limpamos o array

    findVenda.items.push(...removeItemToTroca) // aqui colocamos os dados do outro array
    // console.log(findVenda.items)
    
    await this.saidaEstoque(newItems)
    await this.vendasRepository.save(findVenda)

    return {
      venda: findVenda
    }
  }

  async entradaEstoque(items: number[]) {
    const qtdProd = items.reduce((acc, item) => {
      if(acc[item]){
        acc[item]++
      }else {
        acc[item] = 1
      }

      return acc
    },{})
    // console.log(qtdProd)

    // aqui é para tirar os codProd repetidos
    for(let i = 0; i <= items.length; i++) {
      for(let j = i + 1; j <= items.length; j++) {
        if (items[i] === items[j]) {
          items.splice(j--, 1)
        }
      }
    }
    // Aqui estamos buscando os produtos com base nos códigos recebidos da venda
    
    const prod = items.map(async (item) => {
      const produtosEstoque = await this.estoqueAreaVendasRepository.findByCodProd(item)
      return produtosEstoque
    })

    if(prod.length === 0) {
      throw new Error('Produto não encontrado!!')
    }

    await prod.forEach(async(item) => {
      const valorEstoqueAreaVendas = (await item).quantidade
      const valorCodProd = (await item).codProd

      const qtdProdEstoque = items.reduce((acumulador, index) => {
        if(valorCodProd === index) {
         return acumulador + qtdProd[index]
        }

        return acumulador
      }, valorEstoqueAreaVendas)

      const areaVendas = await item
      
      areaVendas.quantidade = qtdProdEstoque
      await this.estoqueAreaVendasRepository.save(areaVendas)
      // console.log(areaVendas)
    })
  }

  async saidaEstoque(items: number[]) {
    const qtdProd = items.reduce((acc, item) => {
      if(acc[item]){
        acc[item]++
      }else {
        acc[item] = 1
      }

      return acc
    },{})
    // console.log(qtdProd)

    // aqui é para tirar os codProd repetidos
    for(let i = 0; i <= items.length; i++) {
      for(let j = i + 1; j <= items.length; j++) {
        if (items[i] === items[j]) {
          items.splice(j--, 1)
        }
      }
    }
    // Aqui estamos buscando os produtos com base nos códigos recebidos da venda
    
    const prod = items.map(async (item) => {
      const produtosEstoque = await this.estoqueAreaVendasRepository.findByCodProd(item)
      return produtosEstoque
    })

    if(prod.length === 0) {
      throw new Error('Produto não encontrado!!')
    }

    await prod.forEach(async(item) => {
      const valorEstoqueAreaVendas = (await item).quantidade
      const valorCodProd = (await item).codProd

      const qtdProdEstoque = items.reduce((acumulador, index) => {
        if(valorCodProd === index) {
         return acumulador - qtdProd[index]
        }

        return acumulador
      }, valorEstoqueAreaVendas)

      const areaVendas = await item

      areaVendas.quantidade = qtdProdEstoque
      await this.estoqueAreaVendasRepository.save(areaVendas)
      // console.log(areaVendas)
    })
  }
}
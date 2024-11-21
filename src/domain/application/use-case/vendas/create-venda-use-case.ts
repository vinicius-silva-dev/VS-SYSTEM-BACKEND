import { Vendas } from "src/domain/entities/venda-entity";
import { VendasRepository } from "../../repository/vendas-repository";
import { EstoqueAreaVendasRepository } from "../../repository/estoque-area-vendas-repository";
// import { Estoque } from "src/domain/entities/estoque-entity";

interface VendaRequest {
  codVenda: number
  items: number[]
  valorTotal: number
  cartaoCredito?: number | null
  cartãoDebito?: number | null 
  dinheiro?: number | null
  troco: number
  desconto: number
  statusVenda: string
}

type VendaResponse = {
  venda: Vendas
}

export class CreateVendaUseCase {
  constructor(
    private estoqueAreaVendasRepository: EstoqueAreaVendasRepository,
    private vendasRepository: VendasRepository
  ) {}

  async execute({
    codVenda,
    items,
    valorTotal,
    cartaoCredito,
    cartãoDebito,
    dinheiro,
    statusVenda,
    troco,
    desconto
    
  }: VendaRequest): Promise<VendaResponse> {
    // aqui estamos quantificando cada produto dentro desse array
    const qtdProd = items.reduce((acc, item) => {
      if(acc[item]){
        acc[item]++
      }else {
        acc[item] = 1
      }

      return acc
    },{})
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

    // Esse caso de uso não estava passando no test, os produtos criados no estoqueAreaVendas foram criados e quando a vendo é finalizada, o estoqueAreaVendas não é movimentado. Isso acontece porque, no test, estavamos esperando uma quantidade de produtos que ainda não aconteceu. Para resolver, colocamos um await no prod.forEach e, também no expect(inMemoryEstoAreaVendas).
    await prod.forEach(async(item) => {
      // console.log(await item, qtdProd)
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
      // console.log('2°',areaVendas)
    })
    // const estoqueAtualizando = await this.estoqueAreaVendasRepository.findAll()
    


    const venda = Vendas.create({
      cod_venda: codVenda,
      items,
      cartão_debito: cartãoDebito,
      cartao_credito: cartaoCredito,
      dinheiro,
      desconto,
      status_venda: statusVenda,
      troco,
      valor_total: valorTotal,
      createdAt: new Date()
    })

    await this.vendasRepository.create(venda)
    return {
      venda
    }
  }
}
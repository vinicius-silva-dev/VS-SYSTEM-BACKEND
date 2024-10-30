import { VendasRepository } from "src/domain/application/repository/vendas-repository";
import { Vendas } from "src/domain/entities/venda-entity";

export class InMemoryVendas implements VendasRepository {
  public items: Vendas[] = []

  // findAll(): Promise<Estoque[]> {
  //   throw new Error("Method not implemented.");
  // }

  async findById(id: string): Promise<Vendas | null> {
    const venda = await this.items.find(item => item.id.toString() === id)

    if(!venda) {
      return null
    }

    return venda
  }

  async create(venda: Vendas): Promise<void> {
    await this.items.push(venda)
  }

  async save(venda: Vendas): Promise<void> {
    const result = await this.items.findIndex(item => item.id.toString() === venda.id.toString())

    if(result === -1) {
      return null
    }

    this.items[result] = venda
  }

  // async delete(codProd: number): Promise<void> {
  //   const produto = await this.items.findIndex(item => item.cod_prod === codProd)

  //   if(produto === -1) {
  //     return null
  //   }

  //   this.items.splice(produto, 1)
  // }
}
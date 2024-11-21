import { EstoqueAreaVendas } from "@/domain/entities/estoque-area-venda-entity";
import { EstoqueAreaVendasRepository } from "@/domain/application/repository/estoque-area-vendas-repository";

export class InMemoryEstoqueAreaVendas implements EstoqueAreaVendasRepository {
  public items: EstoqueAreaVendas[] = []

  async findAll(): Promise<EstoqueAreaVendas[]> {
    return this.items
  }

  async findByCodProd(CodProd: number): Promise<EstoqueAreaVendas | null> {
    const produto = await this.items.find(item => item.codProd === CodProd)

    if (!produto) {
      return null
    }

    return produto
  }

  async create(estoque: EstoqueAreaVendas): Promise<void> {
    await this.items.push(estoque)
  }

  async save(estoque: EstoqueAreaVendas): Promise<void> {
    
    const produto = await this.items.findIndex(item => item.codProd === estoque.codProd)

    if (produto === -1) {
      return null
    }

    this.items[produto] = estoque
    // console.log(this.items[produto])
    
  }

  async delete(codProd: number): Promise<void> {
    const produto = await this.items.findIndex(item => item.codProd === codProd)

    if (produto === -1) {
      return null
    }

    this.items.splice(produto, 1)
  }
}
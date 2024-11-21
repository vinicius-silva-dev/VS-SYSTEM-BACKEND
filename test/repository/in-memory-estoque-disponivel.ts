import { EstoqueDisponivelRepository } from "@/domain/application/repository/estoque-disponivel-repository";
import { EstoqueDisponivel } from "@/domain/entities/estoque-disponivel-entity";


export class InMemoryEstoqueDisponivel implements EstoqueDisponivelRepository {

  public items: EstoqueDisponivel[] = []

  findAll(): Promise<EstoqueDisponivel[]> {
    throw new Error("Method not implemented.");
  }

  async findByCodProd(codProd: number): Promise<EstoqueDisponivel | null> {
    const produto = await this.items.find(item => item.codProd === codProd)

    if (!produto) {
      return null
    }

    return produto
  }

  async create(estoque: EstoqueDisponivel): Promise<void> {
    // console.log(estoque)
    await this.items.push(estoque)
    
  }

  async save(estoque: EstoqueDisponivel): Promise<void> {
    const produto = await this.items.findIndex(item => item.codProd === estoque.codProd)

    if (produto === -1) {
      return null
    }

    this.items[produto] = estoque
  }

  async delete(codProd: number): Promise<void> {
    const produto = await this.items.findIndex(item => item.codProd === codProd)

    if (produto === -1) {
      return null
    }

    this.items.splice(produto, 1)
  }
}
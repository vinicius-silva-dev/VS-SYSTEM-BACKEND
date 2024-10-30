import { EstoqueRepository } from "src/domain/application/repository/estoque-repository";
import { Estoque } from "src/domain/entities/estoque-entity";

export class InMemoryEstoque implements EstoqueRepository {
  public items: Estoque[] = []

  findAll(): Promise<Estoque[]> {
    throw new Error("Method not implemented.");
  }

  async findByCodProd(CodProd: number): Promise<Estoque | null> {
    const produto = await this.items.find(item => item.cod_prod === CodProd)

    if(!produto) {
      return null
    }

    return produto
  }

  async create(estoque: Estoque): Promise<void> {
    await this.items.push(estoque)
  }

  async save(estoque: Estoque): Promise<void> {
    const produto = await this.items.findIndex(item => item.cod_prod === estoque.cod_prod)

    if(produto === -1) {
      return null
    }

    this.items[produto] = estoque
  }

  async delete(codProd: number): Promise<void> {
    const produto = await this.items.findIndex(item => item.cod_prod === codProd)

    if(produto === -1) {
      return null
    }

    this.items.splice(produto, 1)
  }
}
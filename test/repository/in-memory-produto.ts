import { ProdutoRepository } from "src/domain/application/repository/product-repository"
import { Produto } from "src/domain/entities/produto-entity"


export class InMemoryProduto implements ProdutoRepository {
  public items: Produto[] = []

  async findAll(): Promise<Produto[]> {
    return this.items
  }

  async findById(id: string): Promise<Produto | null> {
    const result = await this.items.find(item => item.id.toString() === id)

    if (!result) {
      return null
    }

    return result
  }

  async findByCodProd(codProd: number): Promise<Produto | null> {
    const result = await this.items.find(item => item.codigo === codProd)

    if (!result) {
      return null
    }

    return result
  }

  
  async create(produto: Produto): Promise<void> {
    await this.items.push(produto)
  }

  async save(produto: Produto): Promise<void> {
    const findIndex = await this.items.findIndex((index) => index.id === produto.id)
    
    if (findIndex === -1) {
      throw new Error('Produto not found !!')
    }

    this.items[findIndex] = produto
  }

  async delete(id: string): Promise<void> {
    const findIndex = await this.items.findIndex((index) => index.id.toString() === id)
    
    if (findIndex === -1) {
      throw new Error('Produto not found !!')
    }

    this.items.splice(findIndex, 1)
  }
}
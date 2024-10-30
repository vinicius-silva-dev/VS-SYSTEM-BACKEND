import { InMemoryProduto } from 'test/repository/in-memory-produto'
import {beforeEach, describe, expect, it} from 'vitest'
import { DeleteProdutoUseCase } from './delete-produto-use-case'
import { Produto } from 'src/domain/entities/produto-entity'


let inMemoryProduto: InMemoryProduto
let sut: DeleteProdutoUseCase
describe('Delete produto', () => {
  beforeEach(() => {
    inMemoryProduto = new InMemoryProduto()

    sut = new DeleteProdutoUseCase(inMemoryProduto)
  })
  it('shoud be abble to delete a produto', async () => {
    const produto = Produto.create({
      codigo: 1,
      codigo_barras: 123456789,
      codigo_ncm: 22022,
      descricao: 'Refrigerante Coca cola Lata 300 ML',
      categoria: 'Bebidas',
      ativo: true,
      tipo_produto: 'Mercadoria para revenda',
      unidade_medida: 'ML',
      custo_mercadoria: '2,50',
      preco_venda: '4,00',
      estoque_inicial: 0,
      createdAt: new Date()
    })

    await inMemoryProduto.create(produto)

    await sut.execute({
      id: produto.id.toString(),
    })
    expect(inMemoryProduto.items).toHaveLength(0)
  })
})
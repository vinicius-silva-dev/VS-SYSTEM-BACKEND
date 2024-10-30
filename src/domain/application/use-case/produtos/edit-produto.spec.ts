import { InMemoryProduto } from 'test/repository/in-memory-produto'
import {beforeEach, describe, expect, it} from 'vitest'
import { EditProdutoUseCase } from './edit-produto-use-case'
import { Produto } from 'src/domain/entities/produto-entity'


let inMemoryProduto: InMemoryProduto
let sut: EditProdutoUseCase
describe('Edit produto', () => {
  beforeEach(() => {
    inMemoryProduto = new InMemoryProduto()

    sut = new EditProdutoUseCase(inMemoryProduto)
  })
  it('shoud be abble to edit a produto', async () => {
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
      descricao: 'Refrigerante Coca cola Lata 350 ML',
      categoria: 'Bebidas',
      ativo: true,
      tipoProduto: 'Mercadoria para revenda',
      unidadeMedida: 'ML',
      custoMercadoria: '2,50',
      precoVenda: '4,00'
    })
    expect(inMemoryProduto.items[0]).toEqual(
      expect.objectContaining({
        descricao: 'Refrigerante Coca cola Lata 350 ML',
      })
    )
  })
})
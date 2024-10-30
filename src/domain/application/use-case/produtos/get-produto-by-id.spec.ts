import { InMemoryProduto } from 'test/repository/in-memory-produto'
import {beforeEach, describe, expect, it} from 'vitest'
import { Produto } from 'src/domain/entities/produto-entity'
import { GetProdutoByIdUseCase } from './get-produto-by-id-use-case'


let inMemoryProduto: InMemoryProduto
let sut: GetProdutoByIdUseCase
describe('Get produto by id', () => {
  beforeEach(() => {
    inMemoryProduto = new InMemoryProduto()

    sut = new GetProdutoByIdUseCase(inMemoryProduto)
  })
  it('shoud be abble to get produtos', async () => {
    const produto = Produto.create({
      codigo: 1,
      codigo_barras: 123456789,
      codigo_ncm: 22022,
      descricao: 'Torta de Frango 300g',
      categoria: 'Lanche',
      ativo: true,
      tipo_produto: 'Mercadoria para revenda',
      unidade_medida: 'gramas',
      custo_mercadoria: '4,50',
      preco_venda: '7,00',
      estoque_inicial: 0,
      createdAt: new Date()
    })

    await inMemoryProduto.create(produto)

    const produto2 = Produto.create({
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

    await inMemoryProduto.create(produto2)

    const result = await sut.execute({id: produto.id.toString()})
    expect(result.produto).toEqual(
      expect.objectContaining({
        descricao: 'Torta de Frango 300g',
      })
    )
  
  })
})
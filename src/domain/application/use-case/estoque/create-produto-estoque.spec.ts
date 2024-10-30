
import {beforeEach, describe, expect, it} from 'vitest'
import { CreateProdutoEstoqueUseCase } from './create-produto-estoque-use-case'
import { InMemoryProduto } from 'test/repository/in-memory-produto'
import { InMemoryEstoque } from 'test/repository/in-memory-estoque'
import { Produto } from 'src/domain/entities/produto-entity'


let inMemoryEstoque: InMemoryEstoque
let inMemoryProduto: InMemoryProduto
let sut: CreateProdutoEstoqueUseCase
describe('Create estoque', () => {
  beforeEach(() => {
    inMemoryEstoque = new InMemoryEstoque()
    inMemoryProduto = new InMemoryProduto()

    sut = new CreateProdutoEstoqueUseCase(inMemoryEstoque, inMemoryProduto)
  })
  it('shoud be abble to create a estoque', async () => {
    const produto = Produto.create({
      codigo: 1,
      codigo_barras: 123456789,
      codigo_ncm: 22022,
      descricao: 'Refrigerante Coca cola Lata 300 ML',
      categoria: 'Bebidas',
      ativo: true,
      tipo_produto: 'Mercadoria para revenda',
      unidade_medida: 'unidade',
      custo_mercadoria: '2,50',
      preco_venda: '4,00',
      estoque_inicial: 0,
      createdAt: new Date()
    })

    await inMemoryProduto.create(produto)

    await sut.execute({
      codProd: 1,
      estoqueDisponivel: 48,
      estoqueAreaVendas: 0
    })

    expect(inMemoryEstoque.items).toHaveLength(1)
  })
})
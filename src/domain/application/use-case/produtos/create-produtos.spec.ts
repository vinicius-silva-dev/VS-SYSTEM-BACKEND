
import {beforeEach, describe, expect, it} from 'vitest'
import { CreateProdutoUseCase } from './create-produtos-use-case'
import { InMemoryProduto } from 'test/repository/in-memory-produto'


let inMemoryProduto: InMemoryProduto
let sut: CreateProdutoUseCase
describe('Create produto', () => {
  beforeEach(() => {
    inMemoryProduto = new InMemoryProduto()

    sut = new CreateProdutoUseCase(inMemoryProduto)
  })
  it('shoud be abble to create a produto', async () => {
    await sut.execute({
      codigo: 1,
      codigoBarras: 123456789,
      codigoNcm: 22022,
      descricao: 'Refrigerante Coca cola Lata 300 ML',
      categoria: 'Bebidas',
      ativo: true,
      tipoProduto: 'Mercadoria para revenda',
      unidadeMedida: 'ML',
      custoMercadoria: '2,50',
      precoVenda: '4,00',
      estoqueInicial: 0,
      createdAt: new Date()
    })
    expect(inMemoryProduto.items).toHaveLength(1)
  })
})
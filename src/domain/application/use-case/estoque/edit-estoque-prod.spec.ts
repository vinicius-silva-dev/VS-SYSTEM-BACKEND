import {beforeEach, describe, expect, it} from 'vitest'
import { InMemoryEstoque } from 'test/repository/in-memory-estoque'

import { EditEstoqueProdEstoqueUseCase } from './edit-estoque-prod-use-case'
import { Estoque } from 'src/domain/entities/estoque-entity'


let inMemoryEstoque: InMemoryEstoque
let sut: EditEstoqueProdEstoqueUseCase
describe('Edit estoque', () => {
  beforeEach(() => {
    inMemoryEstoque = new InMemoryEstoque()

    sut = new EditEstoqueProdEstoqueUseCase(inMemoryEstoque)
  })
  it('shoud be abble to Edit a estoque', async () => {
    const estoque1 = Estoque.create({
      cod_prod: 4,
      descricao: 'Arroz Bernardo T1 5KG',
      estoque_contabil: 30,
      estoque_disponivel: 20,
      estoque_area_vendas: 10,
      createdAt: new Date()
    })

    await inMemoryEstoque.create(estoque1)

    await sut.execute({
      codProd: 4,
      estoqueDisponivel: 48,
      estoqueAreaVendas: 10
    })
    expect(inMemoryEstoque.items[0]).toEqual(
      expect.objectContaining({
        estoque_disponivel: 48,
      })
    )
  })
})
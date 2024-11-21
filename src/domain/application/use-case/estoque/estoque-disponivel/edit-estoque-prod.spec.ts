import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryEstoqueDisponivel } from 'test/repository/in-memory-estoque-disponivel'

import { EditEstoqueProdEstoqueUseCase } from './edit-estoque-prod-use-case'
import { EstoqueDisponivel } from '@/domain/entities/estoque-disponivel-entity'


let inMemoryEstoqueDisponivel: InMemoryEstoqueDisponivel
let sut: EditEstoqueProdEstoqueUseCase
describe('Edit estoque', () => {
  beforeEach(() => {
    inMemoryEstoqueDisponivel = new InMemoryEstoqueDisponivel()

    sut = new EditEstoqueProdEstoqueUseCase(inMemoryEstoqueDisponivel)
  })
  it('shoud be abble to Edit a estoque', async () => {
    const estoque1 = EstoqueDisponivel.create({
      codProd: 4,
      descricao: 'Arroz Bernardo T1 5KG',
      quantidade: 10,
      createdAt: new Date()
    })

    await inMemoryEstoqueDisponivel.create(estoque1)

    await sut.execute({
      codProd: 4,
      descricao: 'Arroz Bernardo T1 5KG',
      quantidade: 12
    })
    expect(inMemoryEstoqueDisponivel.items[0]).toEqual(
      expect.objectContaining({
        quantidade: 12,
      })
    )
  })
})
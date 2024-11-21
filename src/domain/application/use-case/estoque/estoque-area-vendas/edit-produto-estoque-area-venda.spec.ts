import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryEstoqueAreaVendas } from 'test/repository/in-memory-estoque-area-venda'
import { EditProdutoEstoqueAreaVendasUseCase } from './edit-produto-estoque-area-vendas'
import { EstoqueAreaVendas } from '@/domain/entities/estoque-area-venda-entity'


let inMemoryEstoqueAreaVendas: InMemoryEstoqueAreaVendas
let sut: EditProdutoEstoqueAreaVendasUseCase
describe('Edit estoque', () => {
  beforeEach(() => {
    inMemoryEstoqueAreaVendas = new InMemoryEstoqueAreaVendas()

    sut = new EditProdutoEstoqueAreaVendasUseCase(inMemoryEstoqueAreaVendas)
  })
  it('shoud be abble to Edit a estoque', async () => {
    const estoque1 = EstoqueAreaVendas.create({
      codProd: 4,
      descricao: 'Arroz Bernardo T1 5KG',
      quantidade: 10,
      createdAt: new Date()
    })

    await inMemoryEstoqueAreaVendas.create(estoque1)

    await sut.execute({
      codProd: 4,
      descricao: 'Arroz Bernardo T1 5KG',
      quantidade: 12
    })
    expect(inMemoryEstoqueAreaVendas.items[0]).toEqual(
      expect.objectContaining({
        quantidade: 12,
      })
    )
  })
})
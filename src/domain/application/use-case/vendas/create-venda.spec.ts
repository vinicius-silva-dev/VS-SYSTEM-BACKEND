import { InMemoryEstoqueAreaVendas } from "test/repository/in-memory-estoque-area-venda";
import { beforeEach, describe, expect, it } from "vitest";

import { InMemoryVendas } from "test/repository/in-memory-vendas";
import { EstoqueAreaVendas } from "@/domain/entities/estoque-area-venda-entity";
import { CreateVendaUseCase } from "./create-venda-use-case";

let inMemoryEstoqueAreaVendas: InMemoryEstoqueAreaVendas
let inMemoryVendas: InMemoryVendas
let sut: CreateVendaUseCase
describe('Create Venda', () => {
  beforeEach(() => {
    inMemoryEstoqueAreaVendas = new InMemoryEstoqueAreaVendas()
    inMemoryVendas = new InMemoryVendas()

    sut = new CreateVendaUseCase(inMemoryEstoqueAreaVendas, inMemoryVendas)
  })
  it('shoul be abble create a venda', async () => {

    const estoque1 = EstoqueAreaVendas.create({
      codProd: 4,
      descricao: 'Arroz Bernardo T1 5KG',
      quantidade: 10,
      createdAt: new Date()
    })

    await inMemoryEstoqueAreaVendas.create(estoque1)

    const estoque2 = EstoqueAreaVendas.create({
      codProd: 1,
      descricao: 'Macarrão Dallas 1KG',
      quantidade: 10,
      createdAt: new Date()
    })

    await inMemoryEstoqueAreaVendas.create(estoque2)

    const estoque3 = EstoqueAreaVendas.create({
      codProd: 2,
      descricao: 'Trigo Campesina 2KG',
      quantidade: 10,
      createdAt: new Date()
    })

    await inMemoryEstoqueAreaVendas.create(estoque3)

    const estoque4 = EstoqueAreaVendas.create({
      codProd: 3,
      descricao: 'Feijão Bernardo 1KG',
      quantidade: 10,
      createdAt: new Date()
    })

    await inMemoryEstoqueAreaVendas.create(estoque4)
 
    await sut.execute({
      codVenda: 1,
      items: [1, 1, 2, 3, 2, 4],
      valorTotal: 100,
      cartaoCredito: 0,
      cartãoDebito: 0,
      dinheiro: 100,
      troco: 0,
      desconto: 0,
      statusVenda: 'aprodado',
    })
    console.log(await inMemoryEstoqueAreaVendas.items)
    expect(inMemoryVendas.items).toHaveLength(1)
    expect(await inMemoryEstoqueAreaVendas.items).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          codProd: 4,
          quantidade: 9
        }),
        expect.objectContaining({
          codProd: 1,
          quantidade: 8
        }),
        expect.objectContaining({
          codProd: 2,
          quantidade: 8
        }),
        expect.objectContaining({
          codProd: 3,
          quantidade: 9
        }),
      ])
    )

  })
})
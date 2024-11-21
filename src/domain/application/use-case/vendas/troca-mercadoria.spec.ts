
import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryVendas } from "test/repository/in-memory-vendas";
import { EstoqueAreaVendas } from "@/domain/entities/estoque-area-venda-entity";
import { Vendas } from "src/domain/entities/venda-entity";
import { TrocaMercadoriaUseCase } from "./troca-mercadoria-use-case";
import { InMemoryEstoqueAreaVendas } from "test/repository/in-memory-estoque-area-venda";

let inMemoryEstoqueAreaVendas: InMemoryEstoqueAreaVendas
let inMemoryVendas: InMemoryVendas
let sut: TrocaMercadoriaUseCase
describe('Troca Mercadoria', () => {
  beforeEach(() => {
    inMemoryEstoqueAreaVendas = new InMemoryEstoqueAreaVendas()
    inMemoryVendas = new InMemoryVendas()

    sut = new TrocaMercadoriaUseCase(inMemoryEstoqueAreaVendas, inMemoryVendas)
  })
  it('shoul be abble trocar a mercadoria', async () => {

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
      descricao: 'Trigo Campesina 2KG',
      quantidade: 10,
      createdAt: new Date()
    })

    await inMemoryEstoqueAreaVendas.create(estoque4)

    const venda = Vendas.create({
      cod_venda: 1,
      items: [1, 1, 2, 2, 4],
      valor_total: 100,
      cartao_credito: 0,
      cartão_debito: 0,
      dinheiro: 100,
      troco: 0,
      desconto: 0,
      status_venda: 'aprodado',
      createdAt: new Date()
    })

    await inMemoryVendas.create(venda)

    await sut.execute({
      vendaId: venda.id.toString(),
      items: [4],
      newItems: [3]
    })

    console.log(inMemoryEstoqueAreaVendas.items)
    expect(inMemoryVendas.items[0]).toEqual(
      expect.objectContaining({
        items: [1, 1, 2, 2, 3],
      })
    )

    expect(await inMemoryEstoqueAreaVendas.items).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          codProd: 4,
          quantidade: 11
        }),
        expect.objectContaining({
          codProd: 1,
          quantidade: 10
        }),
        expect.objectContaining({
          codProd: 2,
          quantidade: 10
        }),
        expect.objectContaining({
          codProd: 3,
          quantidade: 9
        }),
      ])
    )

  })
})
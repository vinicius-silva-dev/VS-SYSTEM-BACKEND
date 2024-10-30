import { InMemoryEstoque } from "test/repository/in-memory-estoque";
import { beforeEach, describe, expect, it } from "vitest";

import { InMemoryVendas } from "test/repository/in-memory-vendas";
import { Estoque } from "src/domain/entities/estoque-entity";
import { CreateVendaUseCase } from "./create-venda-use-case";

let inMemoryEstoque: InMemoryEstoque
let inMemoryVendas: InMemoryVendas
let sut: CreateVendaUseCase
describe('Create Venda', () => {
  beforeEach(() => {
    inMemoryEstoque = new InMemoryEstoque()
    inMemoryVendas = new InMemoryVendas()

    sut = new CreateVendaUseCase(inMemoryEstoque, inMemoryVendas)
  })
  it('shoul be abble create a venda', async () => {
    
    const estoque1 = Estoque.create({
      cod_prod: 4,
      descricao: 'Arroz Bernardo T1 5KG',
      estoque_contabil: 30,
      estoque_disponivel: 20,
      estoque_area_vendas: 10,
      createdAt: new Date()
    })

    await inMemoryEstoque.create(estoque1)

    const estoque2 = Estoque.create({
      cod_prod: 1,
      descricao: 'Macarrão Dallas 1KG',
      estoque_contabil: 37,
      estoque_disponivel: 27,
      estoque_area_vendas: 10,
      createdAt: new Date()
    })

    await inMemoryEstoque.create(estoque2)

    const estoque3 = Estoque.create({
      cod_prod: 2,
      descricao: 'Trigo Campesina 2KG',
      estoque_contabil: 25,
      estoque_disponivel: 15,
      estoque_area_vendas: 10,
      createdAt: new Date()
    })

    await inMemoryEstoque.create(estoque3)

    const estoque4 = Estoque.create({
      cod_prod: 3,
      descricao: 'Feijão Bernardo 1KG',
      estoque_contabil: 30,
      estoque_disponivel: 20,
      estoque_area_vendas: 10,
      createdAt: new Date()
    })

    await inMemoryEstoque.create(estoque4)

    
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
    
    expect(inMemoryVendas.items).toHaveLength(1)
    // expect(inMemoryEstoque.items).toEqual(
    //   expect.arrayContaining([
    //     expect.objectContaining({
    //       cod_prod: 4,
    //       estoque_area_vendas: 9
    //     }),
    //     expect.objectContaining({
    //       cod_prod: 1,
    //       estoque_area_vendas: 8
    //     }),
    //     expect.objectContaining({
    //       cod_prod: 2,
    //       estoque_area_vendas: 8
    //     }),
    //     expect.objectContaining({
    //       cod_prod: 3,
    //       estoque_area_vendas: 9
    //     }),
    //   ])
    // )

  })
})
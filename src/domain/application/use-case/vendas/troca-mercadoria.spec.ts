import { InMemoryEstoque } from "test/repository/in-memory-estoque";
import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryVendas } from "test/repository/in-memory-vendas";
import { Estoque } from "src/domain/entities/estoque-entity"
import { Vendas } from "src/domain/entities/venda-entity";
import { TrocaMercadoriaUseCase } from "./troca-mercadoria-use-case";

let inMemoryEstoque: InMemoryEstoque
let inMemoryVendas: InMemoryVendas
let sut: TrocaMercadoriaUseCase
describe('Troca Mercadoria', () => {
  beforeEach(() => {
    inMemoryEstoque = new InMemoryEstoque()
    inMemoryVendas = new InMemoryVendas()

    sut = new TrocaMercadoriaUseCase(inMemoryEstoque, inMemoryVendas)
  })
  it('shoul be abble trocar a mercadoria', async () => {
    
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
      descricao: 'Trigo Campesina 2KG',
      estoque_contabil: 25,
      estoque_disponivel: 15,
      estoque_area_vendas: 10,
      createdAt: new Date()
    })

    await inMemoryEstoque.create(estoque4)

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
    
    // console.log(inMemoryEstoque.items)
    expect(inMemoryVendas.items[0]).toEqual(
      expect.objectContaining({
        items: [1, 1, 2, 2, 3],
      })
    )

  })
})
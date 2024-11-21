import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryProduto } from 'test/repository/in-memory-produto'
import { InMemoryEstoqueAreaVendas } from 'test/repository/in-memory-estoque-area-venda'
import { Produto } from 'src/domain/entities/produto-entity'
import { CreateProdutoEstoqueAreaVendasUseCase } from './create-produto-estoque-area-use-case'


let inMemoryEstoqueAreaVendas: InMemoryEstoqueAreaVendas
let inMemoryProduto: InMemoryProduto
let sut: CreateProdutoEstoqueAreaVendasUseCase
describe('Create estoque', () => {
  beforeEach(() => {
    inMemoryEstoqueAreaVendas = new InMemoryEstoqueAreaVendas()
    inMemoryProduto = new InMemoryProduto()

    sut = new CreateProdutoEstoqueAreaVendasUseCase(inMemoryEstoqueAreaVendas, inMemoryProduto)
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

    const produto2 = Produto.create({
      codigo: 2,
      codigo_barras: 123456789,
      codigo_ncm: 22022,
      descricao: 'Refrigerante Frisky Uva Lata 300 ML',
      categoria: 'Bebidas',
      ativo: true,
      tipo_produto: 'Mercadoria para revenda',
      unidade_medida: 'unidade',
      custo_mercadoria: '1,50',
      preco_venda: '3,00',
      estoque_inicial: 0,
      createdAt: new Date()
    })

    await inMemoryProduto.create(produto2)

    const produto3 = Produto.create({
      codigo: 3,
      codigo_barras: 123456789,
      codigo_ncm: 22022,
      descricao: 'Sabão em Pó Minuano 1KG',
      categoria: 'Limpeza',
      ativo: true,
      tipo_produto: 'Mercadoria para revenda',
      unidade_medida: 'KG',
      custo_mercadoria: '15,50',
      preco_venda: '25,00',
      estoque_inicial: 0,
      createdAt: new Date()
    })

    await inMemoryProduto.create(produto3)

    await sut.execute(
      {
        codProd: produto.codigo,
        descricao: produto.descricao,
        quantidade: 10
      }
      // nota: [
      //   // {
      //   //   codProd: produto2.codigo,
      //   //   descricao: produto2.descricao,
      //   //   quantidade: 10
      //   // },
      //   // {
      //   //   codProd: produto3.codigo,
      //   //   descricao: produto3.descricao,
      //   //   quantidade: 10
      //   // }
      // ]
    )
  
    expect(await inMemoryEstoqueAreaVendas.items).toHaveLength(1)
    expect(inMemoryEstoqueAreaVendas.items[0]).toEqual(
      expect.objectContaining({
        codProd: 1,
        descricao: 'Refrigerante Coca cola Lata 300 ML'
      }),
      // expect.arrayContaining([
     
      //   // expect.objectContaining({
      //   //   codProd: 2,
      //   //   descricao: 'Refrigerante Frisky Uva Lata 300 ML',
      //   // }),
      //   // expect.objectContaining({
      //   //   codProd: 3,
      //   //   descricao: 'Sabão em Pó Minuano 1KG',
      //   // }),
      // ])
    )

  })
})
import { Produto } from "@/domain/entities/produto-entity";
import { Prisma, Produto as PrismaProduto } from "@prisma/client";
import { UniqueEntityId } from "core/unique-entity-id";


export class PrismaProdutoMappers {
  static toDomain(raw: PrismaProduto) {
    return Produto.create({
      codigo: raw.codProd,
      codigo_barras: raw.codBarras,
      codigo_ncm: raw.codNcm,
      descricao: raw.descricao,
      categoria: raw.categoria,
      ativo: raw.ativo,
      tipo_produto: raw.tipoProd,
      unidade_medida: raw.unidadeMedida,
      custo_mercadoria: raw.custoMercadoria,
      preco_venda: raw.precoVenda,
      estoque_inicial: raw.estoqueInicial,
      createdAt: raw.createdAt,


    }, new UniqueEntityId(raw.id))
  }

  static toPrisma(produto: Produto): Prisma.ProdutoCreateInput {
    return {
      id: produto.id.toString(),
      codProd: produto.codigo, 
      codBarras: produto.codigo_barras,
      codNcm: produto.codigo_ncm,
      descricao: produto.descricao,
      categoria: produto.categoria,
      ativo: produto.ativo,
      tipoProd: produto.tipo_produto,
      unidadeMedida: produto.unidade_medida,
      custoMercadoria: produto.custo_mercadoria,
      precoVenda: produto.preco_venda,
      estoqueInicial: produto.estoque_inicial,
      createdAt: produto.createdAt,
      updatedAt: produto.updatedAt
    }
  }
}
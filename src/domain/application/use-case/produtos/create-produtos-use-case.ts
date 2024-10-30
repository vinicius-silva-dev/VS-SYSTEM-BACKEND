
import { Produto } from "src/domain/entities/produto-entity";
import { ProdutoRepository } from "../../repository/product-repository";


interface CreateProdutoRequest {
  codigo: number
  codigoBarras: number
  codigoNcm: number
  descricao: string
  categoria: string
  ativo: boolean
  tipoProduto: string
  unidadeMedida: string
  custoMercadoria: string
  precoVenda: string
  estoqueInicial: number
  estoque_minimo?: number | null
  estoque_maximo?: number | null
  createdAt: Date
  updatedAt?: Date | null
}

type CreateProdutoResponse = {
  produto: Produto
}

export class CreateProdutoUseCase {
  constructor(
    private produtoRepository: ProdutoRepository
  ) { }

  async execute({
    codigo,
    codigoBarras,
    codigoNcm,
    descricao,
    categoria,
    ativo,
    tipoProduto,
    unidadeMedida,
    custoMercadoria,
    precoVenda,
    estoqueInicial,
    createdAt
  }: CreateProdutoRequest): Promise<CreateProdutoResponse> {

    const produto = await Produto.create({
      codigo,
      codigo_barras: codigoBarras,
      codigo_ncm: codigoNcm,
      descricao,
      categoria,
      ativo,
      tipo_produto: tipoProduto,
      unidade_medida: unidadeMedida,
      custo_mercadoria: custoMercadoria,
      preco_venda: precoVenda,
      estoque_inicial: estoqueInicial,
      createdAt
    })

    await this.produtoRepository.create(produto)

    return {
      produto
    }
  }
}
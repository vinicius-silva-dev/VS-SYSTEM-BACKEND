import { Entity } from "core/entity";
import { UniqueEntityId } from "core/unique-entity-id";

export interface ProdutoProps {
  id?: UniqueEntityId
  codigo: number
  codigo_barras: number
  codigo_ncm: number
  descricao: string
  categoria: string
  ativo: boolean
  tipo_produto: string
  unidade_medida: string
  custo_mercadoria: string
  preco_venda: string
  estoque_inicial?: number
  estoque_minimo?: number | null
  estoque_maximo?: number | null
  createdAt?: Date
  updatedAt?: Date | null
}
export class Produto extends Entity<ProdutoProps> {
  get codigo() {
    return this.props.codigo
  }

  get codigo_barras() {
    return this.props.codigo_barras
  }

  get codigo_ncm() {
    return this.props.codigo_ncm
  }
  
  get descricao() {
    return this.props.descricao
  }

  
  get categoria() {
    return this.props.categoria
  }
  
  get ativo() {
    return this.props.ativo
  }

  get tipo_produto() {
    return this.props.tipo_produto
  }

  get unidade_medida() {
    return this.props.unidade_medida
  }

  get custo_mercadoria() {
    return this.props.custo_mercadoria
  }

  get preco_venda() {
    return this.props.preco_venda
  }

  get estoque_inicial() {
    return this.props.estoque_inicial
  }

  get estoque_minimo() {
    return this.props.estoque_minimo
  }

  get estoque_maximo() {
    return this.props.estoque_maximo
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  touch() {
    this.props.updatedAt = new Date()
  }

  set codigo(codigo: number) {
    this.props.codigo = codigo

    this.touch()
  }

  set codigo_barras(codigoBarras: number) {
    this.props.codigo_barras = codigoBarras

    this.touch()
  }

  set codigo_ncm(codigoNcm: number) {
    this.props.codigo_ncm = codigoNcm

    this.touch()
  }


  set descricao(descricao: string) {
    this.props.descricao = descricao

    this.touch()
  }

  set categoria(categoria: string) {
    this.props.categoria = categoria

    this.touch()
  }

  set tipo_produto(tipoProduto: string) {
    this.props.tipo_produto = tipoProduto

    this.touch()
  }

  set preco_venda(precoVenda: string) {
    this.props.preco_venda = precoVenda

    this.touch()
  }

  set custo_mercadoria(custoMercadoria: string) {
    this.props.custo_mercadoria = custoMercadoria

    this.touch()
  }

  set ativo(ativo: boolean) {
    this.props.ativo = ativo

    this.touch()
  }

  set unidade_medida(unidadeMedida: string) {
    this.props.unidade_medida = unidadeMedida

    this.touch()
  }

  static create(props: ProdutoProps, id?: UniqueEntityId) {
    const produto = new Produto(props, id)
    return produto
  }
}
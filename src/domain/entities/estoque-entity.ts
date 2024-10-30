import { Entity } from "core/entity";
import { UniqueEntityId } from "core/unique-entity-id";

interface EstoqueProps {
  id?: UniqueEntityId
  cod_prod: number
  descricao: string
  estoque_contabil: number
  estoque_disponivel: number
  estoque_area_vendas: number
  createdAt: Date
  updatedAt?: Date | null
}

export class Estoque extends Entity<EstoqueProps> {
  get cod_prod() {
    return this.props.cod_prod
  }

  get descricao() {
    return this.props.descricao
  }

  get estoque_contabil() {
    return this.props.estoque_contabil
  }

  get estoque_disponivel() {
    return this.props.estoque_disponivel
  }

  get estoque_area_vendas() {
    return this.props.estoque_area_vendas
  }

  get createdAt() {
    return this.props.createdAt
  }

  touch() {
    this.props.updatedAt = new Date()
  }

  updateEstoqueContabil() {
    this.props.estoque_contabil = this.props.estoque_disponivel + this.props.estoque_area_vendas
  }

  set estoque_contabil(estoqueContabil: number) {
    this.props.estoque_contabil = estoqueContabil

    this.touch()
  }

  set estoque_disponivel(estoqueDisponivel: number) {
    this.props.estoque_disponivel = estoqueDisponivel

    this.touch()
    this.updateEstoqueContabil()
  }

  set estoque_area_vendas(estoqueAreaVendas: number) {
    this.props.estoque_area_vendas = estoqueAreaVendas

    this.touch()
    this.updateEstoqueContabil()
  }

  static create(props: EstoqueProps, id?: UniqueEntityId) {
    const estoque = new Estoque(props, id)
    return estoque
  }
}
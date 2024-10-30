import { Entity } from "core/entity";
import { UniqueEntityId } from "core/unique-entity-id";

export interface VendaProps {
  id?: UniqueEntityId
  cod_venda: number
  items: number[]
  valor_total: number
  cartao_credito: number
  cartão_debito: number
  dinheiro: number
  troco: number
  desconto: number
  status_venda: string
  createdAt: Date
  updatedAt?: Date | null
}
export class Vendas extends Entity<VendaProps> {
  get cod_venda() {
    return this.props.cod_venda
  }
  
  get items() {
    return this.props.items
  }

  get valor_total() {
    return this.props.valor_total
  }

  get cartao_credito() {
    return this.props.cartao_credito
  }

  get cartao_debito() {
    return this.props.cartão_debito
  }

  get dinheiro() {
    return this.props.dinheiro
  }

  get troco() {
    return this.props.troco
  }

  get desconto() {
    return this.props.desconto
  }

  get status_venda() {
    return this.props.status_venda
  }

  get createdAt() {
    return this.props.createdAt
  }

  touch() {
    this.props.updatedAt = new Date()
  }

  set cartao_credito(cartaoCredito: number) {
    this.cartao_credito= cartaoCredito

    this.touch()
  }

  set dinheiro(dinheiro: number) {
    this.dinheiro= dinheiro

    this.touch()
  }

  set cartao_debito(cartaoDebito: number) {
    this.cartao_debito= cartaoDebito

    this.touch()
  }

  set status_venda(statusVenda: string) {
    this.status_venda= statusVenda

    this.touch()
  }

  set items(items: number[]) {
    this.items= items

    this.touch()
  }

  static create(props: VendaProps, id?: UniqueEntityId) {
    const venda = new Vendas(props, id)
    return venda
  }
}
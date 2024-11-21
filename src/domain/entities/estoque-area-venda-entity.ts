import { Entity } from "core/entity";
import { UniqueEntityId } from "core/unique-entity-id";

interface EstoqueAreaVendasProps {
  id?: UniqueEntityId
  codProd: number
  descricao: string
  quantidade: number
  createdAt: Date
  updatedAt?: Date | null
}

export class EstoqueAreaVendas extends Entity<EstoqueAreaVendasProps> {
  get codProd() {
    return this.props.codProd
  }

  get descricao() {
    return this.props.descricao
  }

  get quantidade() {
    return this.props.quantidade
  }

  get createdAt() {
    return this.props.createdAt
  }

  touch() {
    this.props.updatedAt = new Date()
  }

  set descricao(descricao: string) {
    this.props.descricao = descricao

    this.touch()
  
  }

  set quantidade(quantidade: number) {
    this.props.quantidade = quantidade

    this.touch()
  
  }


  static create(props: EstoqueAreaVendasProps, id?: UniqueEntityId) {
    const estoque = new EstoqueAreaVendas(props, id)
    return estoque
  }
}
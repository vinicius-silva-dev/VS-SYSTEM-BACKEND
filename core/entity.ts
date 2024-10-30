import { UniqueEntityId } from "./unique-entity-id";

// Essa é uma classe para entidades, nela eu recebo as propriedades das classes e retorno. A vantagem dessa classe é que podemos criar métodos para trabalhar essas propriedades, os métodos podem ser usados em todas as entitades que estender essa classe.
export abstract class Entity<Props> {
  private _id: UniqueEntityId
  protected props: Props

  get id() {
    return this._id
  }

  constructor(props: Props, id?: UniqueEntityId) {
    this.props = props
    this._id = id ?? new UniqueEntityId()
  }
}

import { Entity } from "core/entity";
import { UniqueEntityId } from "core/unique-entity-id";

export interface UserProps {
  id?: UniqueEntityId
  name: string
  username: string
  email: string
  password: string
  role: string
  createdAt?: Date
  updatedAt?: Date
}
export class User extends Entity<UserProps> {
  get name() {
    return this.props.name
  }

  get username() {
    return this.props.username
  }

  get email() {
    return this.props.email
  }

  get password() {
    return this.props.password
  }

  get role() {
    return this.props.role
  }

  touch() {
    this.props.updatedAt = new Date()
  }

  set password(password: string) {
    this.props.password = password

    this.touch()
  }

  set email(email: string) {
    this.props.email = email

    this.touch()
  }

  set role(role: string) {
    this.props.role = role

    this.touch()
  }

  static create(props: UserProps, id?: UniqueEntityId) {
    const user = new User(props, id)
    return user
  }
}
import { User } from "@/domain/entities/user-entiity";

export abstract class UserRepository {
  abstract findAll(): Promise<User[]>
  abstract findById(id: string): Promise<User | null>
  abstract findByEmail(email: string): Promise<User | null>
  abstract findByUserName(userName: string): Promise<User | null>
  abstract create(user: User): Promise<void>
  abstract save(user: User): Promise<void>
  abstract delete(id: string): Promise<void>
}
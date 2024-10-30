import { User } from "src/domain/entities/user-entiity";
import { Injectable } from "@nestjs/common";
import { UserRepository } from "../../repository/user-repository";

interface CreateUserRequest {
  name: string
  email: string
  password: string
  role: string
}

type CreateUserResponse = {
  user: User
}

@Injectable()
export class CreateUserUseCase {
  constructor(
    private userRepository: UserRepository
  ) {}

  async execute({
    name,
    email,
    password,
    role
  }: CreateUserRequest): Promise<CreateUserResponse> {
  
    const user = await User.create({
      name,
      email,
      password,
      role
    })
  

    await this.userRepository.create(user)

    return {
      user
    }
  }
}
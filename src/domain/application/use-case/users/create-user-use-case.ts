import { User } from "src/domain/entities/user-entiity";
import { Injectable } from "@nestjs/common";
import { UserRepository } from "../../repository/user-repository";

interface CreateUserRequest {
  name: string
  username: string
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
    username,
    email,
    password,
    role
  }: CreateUserRequest): Promise<CreateUserResponse> {
    const findUser = await this.userRepository.findByUserName(username)

    if(findUser) {
      throw new Error('Esté usuário já existe.')
    }
    
    const user = await User.create({
      name,
      username,
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
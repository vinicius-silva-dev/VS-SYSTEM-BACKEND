import { User } from "src/domain/entities/user-entiity";
import { UserRepository } from "../../repository/user-repository";
import { Injectable } from "@nestjs/common";

interface EditUserRequest {
  id: string
  email: string
  password: string,
  role
}

type EditUserResponse = {
  user: User
}

@Injectable()
export class EditUserUseCase {
  constructor(
    private userRepository: UserRepository
  ) {}

  async execute({
    id,
    email,
    password,
    role
  }: EditUserRequest): Promise<EditUserResponse> {

    const user = await this.userRepository.findById(id)
    // console.log(user)

    if (!user) {
      throw new Error('User not found !')
    }

    user.password = password
    user.email = email
    user.email = role

    await this.userRepository.save(user)

    return {
      user
    }
  }
}
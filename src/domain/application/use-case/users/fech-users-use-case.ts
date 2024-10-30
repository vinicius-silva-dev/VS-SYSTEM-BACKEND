import { Injectable } from "@nestjs/common";
import { UserRepository } from "../../repository/user-repository";

@Injectable()
export class FechUsersUseCase {
  constructor(private userRepository: UserRepository) { }

  async execute() {
    const users = await this.userRepository.findAll()

    if (!users) {
      throw new Error('Users not found!!')
    }

    return {
      users
    }
  }
}
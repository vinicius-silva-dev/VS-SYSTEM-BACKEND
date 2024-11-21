import { Module } from "@nestjs/common";
import { DatabaseModule } from "../database/database.module";

import { CreateUserController } from "./controllers/user/create-user.controller";
import { AuthenticateController } from "./controllers/user/authenticate.controller";
import { FetchUserController } from "./controllers/user/fetch-user.controller";


import { AuthenticateUseCase } from "@/domain/application/use-case/users/authentica-use-case";
import { EditUserUseCase } from "@/domain/application/use-case/users/edit-user-use-case";

import { CreateUserUseCase } from "@/domain/application/use-case/users/create-user-use-case";
import { FechUsersUseCase } from "@/domain/application/use-case/users/fech-users-use-case";
import { EditUserController } from "./controllers/user/edit-user.controller";
import { DeleteUserController } from "./controllers/user/delete-user.controller";
import { DeleteUserUseCase } from "@/domain/application/use-case/users/delete-user-use-case";
import { GetUserByIdController } from "./controllers/user/get-user-by-id.controller";
import { GetUserByIdUseCase } from "@/domain/application/use-case/users/get-user-by-id-use-case";
import { CreateProdutoController } from "./controllers/produtos/create-produto.controller";
import { CreateProdutoUseCase } from "@/domain/application/use-case/produtos/create-produtos-use-case";
import { EditProdutoUseCase } from "@/domain/application/use-case/produtos/edit-produto-use-case";
import { EditProdutoController } from "./controllers/produtos/edit-produto.controller";
import { FetchProdutoController } from "./controllers/produtos/fetch-produtos.controller";
import { FetchProdutosUseCase } from "@/domain/application/use-case/produtos/fetch-produtos-use-case";
import { DeleteProdutoUseCase } from "@/domain/application/use-case/produtos/delete-produto-use-case";
import { DeleteProdutoController } from "./controllers/produtos/delete-produto.controller";

// import { JwtService } from "@nestjs/jwt";
// import { AuthGuard } from "../auth/auth.guard";

@Module({
  imports: [DatabaseModule],
  controllers: [
    CreateUserController,
    AuthenticateController,
    EditUserController,
    FetchUserController,
    GetUserByIdController,
    DeleteUserController,

    CreateProdutoController,
    EditProdutoController,
    FetchProdutoController,
    DeleteProdutoController
  ],
  providers: [
    AuthenticateUseCase,
    CreateUserUseCase,
    EditUserUseCase,
    FechUsersUseCase,
    GetUserByIdUseCase,
    DeleteUserUseCase,

    CreateProdutoUseCase,
    EditProdutoUseCase,
    FetchProdutosUseCase,
    DeleteProdutoUseCase
  ],
})
export class HttpModule { }

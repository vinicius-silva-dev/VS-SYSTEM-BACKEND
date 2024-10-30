import { Module } from "@nestjs/common";
// import { JwtModule } from "@nestjs/jwt";
import { AuthenticateController } from "../http/controllers/user/authenticate.controller";
// import { AuthService } from "./auth.service";
// import { DatabaseModule } from "@/infra/database/database.module";
// import { Env } from "@/env/env";
// import { AuthGuard } from "./auth.guard";
// import { JwtService } from "@nestjs/jwt";
// import { EnvService } from "@/env/env.service";
// import { UserRepository } from "@/domain/application/repository/user-repository";

// let env: Env

@Module({
  // imports: [
  //   DatabaseModule,
  //   JwtModule.register({
  //     global: true,
  //     secret: env.SECRET_KEY,      
  //     signOptions: { expiresIn: '120s' }
  //   })
  // ],
  providers: [
    // JwtService,
    // AuthGuard

  ],
  controllers: [AuthenticateController],
  // exports: [AuthService]
})
export class AuthModule { }
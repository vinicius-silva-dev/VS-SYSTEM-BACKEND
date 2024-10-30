import { Module } from '@nestjs/common'
import { AppService } from './app.service'
import { HttpModule } from './infra/http/http.module'

// import { AuthModule } from './infra/auth/auth.module'
// import { EnvModule } from './env/env.module'

@Module({
  imports: [HttpModule],
  providers: [AppService],
})
export class AppModule { }

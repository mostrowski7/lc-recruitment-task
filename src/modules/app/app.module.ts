import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import validate from '../../config/env.validation';
import { UserModule } from '../user/user.module';
import { AuthModule } from '../auth/auth.module';
import { FileModule } from '../file/file.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate,
    }),
    UserModule,
    AuthModule,
    FileModule,
  ],
  providers: [AppService],
})
export class AppModule {}

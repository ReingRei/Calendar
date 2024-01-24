import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entitys/user.entity';
import { EventEntity } from './entitys/event.entity';
import { AuthModule } from './modules/auth/auth.module';
import { EventModule } from './modules/event/event.module';
import { UserModule } from './modules/user/user.module';
import { JwtModule } from '@nestjs/jwt';

import * as crypto from 'crypto';

console.log(crypto.randomBytes(16).toString('hex'));

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "sqlite",
      database: "src/database/database.sqlite",
      synchronize: true,
      logging: true,
      entities: ["dist/**/*.entity{.ts,.js}"],
    }),
    TypeOrmModule.forFeature([UserEntity, EventEntity]),
    JwtModule.register({
      secretOrPrivateKey: 'e3fff5764f30c6edf75a9c4d0f683a93',
      secret: 'e3fff5764f30c6edf75a9c4d0f683a93',
      signOptions: { expiresIn: '1h', algorithm: 'RS256',  },
    }),
    AuthModule,
    EventModule,
    UserModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entitys/user.entity';
import { EventEntity } from './entitys/event.entity';
import { AuthModule } from './modules/auth/auth.module';
import { EventModule } from './modules/event/event.module';
import { UserModule } from './modules/user/user.module';

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
    AuthModule,
    EventModule,
    UserModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }

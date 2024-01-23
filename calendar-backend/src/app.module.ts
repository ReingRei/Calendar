import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entitys/user.entity';
import { EventEntity } from './entitys/event.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "sqlite",
      database: "src/database/database.sqlite",
      synchronize: true,
      logging: true,
      entities: ["dist/**/*.entity{.ts,.js}"],
    }),
    TypeOrmModule.forFeature([UserEntity, EventEntity])
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }

import { Module } from "@nestjs/common";
import { EventController } from "./event.controller";
import { EventService } from "./event.service";
import { EventEntity } from "src/entitys/event.entity";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
    controllers: [EventController],
    providers: [EventService],
    imports: [
        TypeOrmModule.forFeature([EventEntity]),
    ],
})
export class EventModule {}
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateEventDto, UserDto } from "src/common/dto";
import { EventEntity } from "src/entitys/event.entity";
import { LessThan, LessThanOrEqual, MoreThan, MoreThanOrEqual, Repository } from "typeorm";

@Injectable()
export class EventService {

    constructor(
        @InjectRepository(EventEntity)
        private _eventRepository: Repository<EventEntity>
    ) { }

    async getEvents(user: UserDto, date: Date) {
        await this._eventRepository.find({
            where: [
                {
                    author: { id: user.sub },
                    startTime: MoreThanOrEqual(new Date(date.toLocaleDateString() + ' 00:00:00'))
                },
                {
                    author: { id: user.sub },
                    endTime: LessThanOrEqual(new Date(date.toLocaleDateString() + ' 23:59:59'))
                }
            ]
        })
    }

    async createEvent(user: UserDto, payload: CreateEventDto) {
        
    }

    async updateEvents(user: UserDto, payload: CreateEventDto) { }
}
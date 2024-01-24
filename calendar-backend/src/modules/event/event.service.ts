import { Injectable, UnauthorizedException,PreconditionFailedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateEventDto, UserDto } from "src/common/dto";
import { EventEntity } from "src/entitys/event.entity";
import { UserEntity } from "src/entitys/user.entity";
import { Between, DataSource, EntityManager, LessThanOrEqual, MoreThanOrEqual, Repository } from "typeorm";

@Injectable()
export class EventService {

    constructor(
        @InjectRepository(EventEntity)
        private _eventRepository: Repository<EventEntity>,
        private _dataSource: DataSource
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
        return this._dataSource.transaction(async (manager: EntityManager): Promise<EventEntity> => {
            const user_db = await manager.findOne(UserEntity, { where: { id: user.sub } });
            if (!user_db) {
                throw new UnauthorizedException('Usuário não foi encontrado.')
            }

            await this._findCompetitorsTimetable(user.sub, payload);

            const new_event = manager.create(EventEntity,)
        })
    }

    private async _findCompetitorsTimetable(udserId: number, payload: CreateEventDto) {
        const { startTime, endTime } = payload;
        const result = await this._eventRepository.findOne({
            where: [
                {
                    author: { id: udserId },
                    startTime: Between(startTime, endTime)
                },
                {
                    author: { id: udserId },
                    endTime: Between(startTime, endTime)
                },
                {
                    guests: { id: udserId },
                    startTime: Between(startTime, endTime)
                },
                {
                    guests: { id: udserId },
                    endTime: Between(startTime, endTime)
                },
            ]
        })

        if (result) {
            throw new PreconditionFailedException('Você já tem um evento nesse horário!')
        }
    }


    async updateEvents(user: UserDto, payload: CreateEventDto) { }
}
import { Injectable, UnauthorizedException, PreconditionFailedException } from "@nestjs/common";
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

            const new_event = manager.create(EventEntity, {
                idAuthor: user.sub,
                description: payload.description,
                endTime: payload.endTime,
                startTime: payload.startTime,
            });

            await manager.insert(EventEntity, new_event);

            // if (payload.guests) {}

            return new_event;
        })
    }

    private async _findCompetitorsTimetable(userId: number, payload: CreateEventDto) {
        const { startTime, endTime } = payload;
        const event = await this._eventRepository
            .createQueryBuilder('ev')
            // .leftJoinAndSelect('ev.guests', 'gu', 'gu.id = :userId', { userId })
            .where('ev.author = :userId', { userId })
            .orWhere('ev')
            .andWhere('ev.startTime BETWEEN :startTime AND :endTime', { startTime, endTime })
            .orWhere('ev.endTime BETWEEN :startTime AND :endTime', { startTime, endTime })
            .orWhere(':startTime BETWEEN ev.startTime AND ev.endTime', { startTime })
            .orWhere(':startTime BETWEEN ev.startTime AND ev.endTime', { endTime })
            .getOne();
        if (event) {
            throw new PreconditionFailedException('Você já tem um evento nesse horário!')
        }
    }

    private async _inviteForEvent(manager: EntityManager, idEvent: number, emails: string[]) {
        
    }


    async updateEvents(user: UserDto,idEvent:number, payload: CreateEventDto) {

    }
}
import { Body, Controller, Get, Post, Put, Request } from "@nestjs/common";
import { EventService } from "./event.service";
import { CreateEventDto } from "src/common/dto/create-event.dto";

@Controller('event')
export class EventController {
    constructor(private _evetService: EventService) { }

    @Get()
    async getEvents(@Request() { user }) {

    }

    @Post()
    async createEvent(@Request() { user }, @Body() payload: CreateEventDto) { }

    @Put()
    async updateEvents(@Request() { user }, @Body() payload: CreateEventDto) { }
}
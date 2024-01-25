import { Body, Controller, Get, Post, Put, Request, Query, Param } from "@nestjs/common";
import { EventService } from "./event.service";
import { CreateEventDto } from "src/common/dto/create-event.dto";

@Controller('event')
export class EventController {
    constructor(private _evetService: EventService) { }

    @Get()
    async getEvents(@Request() { user }, @Query() { data }) {
        return this._evetService.getEvents(user, data)
    }

    @Post()
    async createEvent(@Request() { user }, @Body() payload: CreateEventDto) {
        return this._evetService.createEvent(user, payload)
    }

    @Put(':idEvent')
    async updateEvents(@Request() { user }, @Body() payload: CreateEventDto, @Param() { idEvent }) {
        return this._evetService.updateEvents(user, idEvent, payload)
    }
}
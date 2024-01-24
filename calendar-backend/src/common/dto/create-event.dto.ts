import { IsArray, IsDateString, IsNotEmpty, IsString } from "class-validator";

export class CreateEventDto {
    @IsNotEmpty()
    @IsString()
    description: string;

    @IsNotEmpty()
    @IsDateString()
    startTime: Date;

    @IsNotEmpty()
    @IsDateString()
    endTime: Date;

    @IsNotEmpty()
    @IsArray()
    guests: string[];
}
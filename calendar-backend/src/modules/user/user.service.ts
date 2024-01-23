import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "src/common/dto";
import { UserEntity } from "src/entitys/user.entity";

@Injectable()
export class UserService {
    
    async findByEcreateUsermail(payload: CreateUserDto): Promise<UserEntity> {
        return;
    }

    async findByEmail(email: string): Promise<UserEntity> {
        return;
    }
}
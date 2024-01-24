import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateUserDto } from "src/common/dto";
import { UserEntity } from "src/entitys/user.entity";
import { Repository } from "typeorm";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private _usersRepository: Repository<UserEntity>,
    ) { }

    async createUser(payload: CreateUserDto): Promise<UserEntity> {
        console.log(payload);
        // const user = await this.findByEmailOrPhone(payload.email, payload.phone);
        // if (user) {
        //     throw new BadRequestException('Já existe um usuário cadastrado com essas credenciais.')
        // }
        const new_user = this._usersRepository.create({
            name: payload.name,
            email: payload.email,
            phone: payload.phone,
            password: payload.password,
        })

        await this._usersRepository.insert(new_user).then().catch((error) => {
            console.log(error);
            throw new BadRequestException('Ocorreu um erro ao criar um usuário.');
        });

        return new_user;
    }

    async findByEmailOrPhone(email: string, phone?: string): Promise<{
        id: number,
        name: string,
        password: string
    }> {
        return this._usersRepository.findOne({
            where: [
                { email },
                { phone },
            ],
            select: {
                id: true,
                name: true,
                password: true
            }
        })
    }
}
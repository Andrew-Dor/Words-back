import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserParams } from './user.type';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: MongoRepository<User>,
    ) {}

    //new user creation
    async signUp(params: CreateUserParams):Promise<boolean> {
        try {
            const {email,name,password} = params;
            const user = new User();
            user.name = name;
            user.password = password;
            user.email = password;
    
            await this.userRepository.save(user);
            return true;
        } catch (err) {
            throw new InternalServerErrorException();
        }

    }
}

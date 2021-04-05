import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserParams } from './user.type';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: MongoRepository<User>,
    ) { }

    // async getUserByEmail(email:string):Promise<User> {
    //     return await this.userRepository.findOne({email});
    // }

    //new user creation
    async signUp(params: CreateUserParams): Promise<boolean> {
        const { email, name, password } = params;

        const user = new User();
        user.name = name;
        user.password = password;
        user.email = email;

        try {
            await this.userRepository.save(user);
            return true;
        } catch (error) {
            if (error.code === 11000) {
                throw new ConflictException('This email has already exists!');
            } else {
                throw new InternalServerErrorException();
            }
        }
    }

}

import { ConflictException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserParams, SignInParams } from './user.type';
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: MongoRepository<User>,
    ) { }

    private async hashPassword(password:string): Promise<string> {
        const salt = await bcrypt.genSalt();
        return bcrypt.hash(password,salt);
    }

    async signUp(params: CreateUserParams): Promise<boolean> {
        const { email, name, password } = params;

        const user = new User();
        user.name = name;
        user.password = await this.hashPassword(password);
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

    async signIn(params: SignInParams):Promise<string> {
        const username = await this.validateUserPassword(params);
        if(!username){
            throw new UnauthorizedException('Invalid email or password');
        }
        return username;
    }

    async validateUserPassword(params: SignInParams):Promise<string> {
        const { email, password } = params;
        const user = await this.userRepository.findOne({email});

        if(user && await user.validatePassword(password)){
            return user.name;
        }
        return null;
    }

}
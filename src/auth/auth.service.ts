import {
    ConflictException,
    Injectable,
    InternalServerErrorException,
    UnauthorizedException,
} from '@nestjs/common';
import { AccessTokenObject, CreateUserParams, SignInParams, User, UserDocument } from './user.type';
import * as bcrypt from 'bcrypt';
import { ErrorCodes } from 'src/utils/constants';
import { JwtService } from '@nestjs/jwt';
import { IJwtPayload } from './auth.types';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
        private jwtService: JwtService,
    ) {}

    private async hashPassword(password: string): Promise<string> {
        const salt = await bcrypt.genSalt();
        return bcrypt.hash(password, salt);
    }

    private async validatePassword(inputPassword: string, userPassword: string): Promise<boolean> {
        return bcrypt.compare(inputPassword, userPassword);
    }

    async signUp(params: CreateUserParams): Promise<boolean> {
        const { email, name, password } = params;
        const hashedPassword = await this.hashPassword(password);
        const newUser = new this.userModel({
            email,
            name,
            password: hashedPassword
        });

        try {
            await newUser.save();
            return true;
        } catch (error) {
            if (error.code === ErrorCodes.DUPLICATE_USER) {
                throw new ConflictException('This email has already exists!');
            } else {
                throw new InternalServerErrorException();
            }
        }

        // const user = new User();
        // user.name = name;
        // user.password = await this.hashPassword(password);
        // user.email = email;

        // try {
        //     await this.userRepository.save(user);
        //     return true;
        // } catch (error) {
        //     if (error.code === ErrorCodes.DUPLICATE_USER) {
        //         throw new ConflictException('This email has already exists!');
        //     } else {
        //         throw new InternalServerErrorException();
        //     }
        // }
    }

    async signIn(params: SignInParams): Promise<AccessTokenObject> {
        const username = await this.validateUserPassword(params);
        if (!username) {
            throw new UnauthorizedException('Invalid email or password');
        }

        const payload: IJwtPayload = { username, email: params.email };
        const accessToken = await this.jwtService.sign(payload);

        return { accessToken };
    }

    async validateUserPassword(params: SignInParams): Promise<string> {
        const { email, password } = params;
        const user = await this.userModel.findOne({email});

        if (user && (await this.validatePassword(password,user.password))) {
            return user.name;
        }
        return null;
    }
}

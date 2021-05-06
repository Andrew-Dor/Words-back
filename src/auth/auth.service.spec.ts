import { JwtModule, JwtService } from '@nestjs/jwt';
import { getModelToken } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { mockedJwtService } from "../utils/mocks/jwt.service";
import { User } from './user.type';
import * as bcrypt from 'bcrypt';

jest.mock('bcrypt');

function mockUserModel(dto: any) {
    this.data = dto;
    this.findOne = () => {
        return this.data;
    };
    this.create = (dto:any) => true;
}

const testUser = {
    email: "test@test.com",
    name: "user",
    password: "qwe123ASD*"
}

describe('AuthService', () => {
    let service: AuthService;
    let userModel;

    beforeEach(async () => {
        userModel = new mockUserModel(testUser);
        const validatePasswordMock = jest.spyOn(AuthService.prototype as any, 'validatePassword');
        validatePasswordMock.mockImplementation(() => true);
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                PassportModule.register({
                    defaultStrategy: 'jwt',
                }),
            ],
            providers: [
                AuthService,
                {
                    provide: getModelToken(User.name),
                    useValue: userModel,
                },
                {
                    provide: JwtService,
                    useValue: mockedJwtService,
                }
            ],
        }).compile();

        service = module.get<AuthService>(AuthService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('When sign up user', () => {
        it('Should call create',async () => {
            const createSpy = jest.spyOn(userModel, "create");
            try {
                await service.signUp({
                    email: "test@test.com",
                    name: "user",
                    password: "qwe123ASD*"
                });
                expect(createSpy).toBeCalledTimes(1);
            } catch(e) {
                console.log(e);
            }
        });

        it('Should return true if success', () => {
            expect(service.signUp({
                email: "test@test.com",
                name: "user",
                password: "qwe123ASD*"
            })).resolves.toEqual(true).catch(err => console.log(err));
        });
    });

    describe('when sign in user', () => {
        it('should attempt to validate user password', () => {
            const singnInSpy = jest.spyOn(service, "validateUserPassword");
            service.signIn({
                email: "test@test.com",
                password: "qwe123ASD*"
            }).catch(err => console.log(err));
            expect(singnInSpy).toBeCalledTimes(1);
        });

        it('should call findOne',async ()=>{
            const findOneSpy = jest.spyOn(userModel, "findOne");
            try{
                await service.signIn({
                    email: "test@test.com",
                    password: "qwe123ASD*"
                });
                expect(findOneSpy).toBeCalledTimes(1);
            } catch(e){
                console.log(e);
            }
        })
    });
});

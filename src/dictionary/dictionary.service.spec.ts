import { ForbiddenException, NotFoundException } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { DateTime } from 'luxon';
import { Dictionary } from './dictionary.model';
import { DictionaryService } from './dictionary.service';

function mockDictionaryModel(dto: any) {
    this.data = dto;
    this.create = (dto: any) => {
        return this.data;
    };
    this.findById = (id: string) => {
        return id === testDictionary.id ? testDictionary : null;
    };
    this.findByIdAndUpdate = (id:string,updateObject:any,options:any) => {
        this.data.name = updateObject.name;
        return this.data;
    };
    this.deleteOne = () => {return true};
}

const testDictionary = {
    id: '123',
    name: 'Test',
    description: 'test',
    type: 'PRIVATE' as any,
    words: [],
    contributors: [],
    createdAt: DateTime.now()
        .set({ hour: 0, minute: 0, second: 0, millisecond: 0 })
        .toMillis(),
    ownerId: 'testId',
};

describe('DictionaryService', () => {
    let service: DictionaryService;
    let dictionaryModel;

    beforeEach(async () => {
        dictionaryModel = new mockDictionaryModel(testDictionary);
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                DictionaryService,
                {
                    provide: getModelToken(Dictionary.name),
                    useValue: dictionaryModel,
                },
            ],
        }).compile();

        service = module.get<DictionaryService>(DictionaryService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('When try to create dictionary', () => {
        it('should create dictionary', async () => {
            try {
                const dictionary = await service.createDictionary({
                    name: "Test",
                    description: "test",
                    type: 'PUBLIC' as any,
                }, "asd" as any);
                expect(dictionary).toEqual(testDictionary);
            } catch (error) {
                console.log(error);
            }
        });
    });

    describe('When try to get dictionary by id',()=>{
        it('Should get dictionary by id', async () => {
            try {
                const dictionary = await service.getDictionaryById('123', 'testId');
                expect(dictionary).toEqual(testDictionary);
            } catch (error) {
                console.log(error);
    
            }
        });
    
        it('should throw NotFoundException', async () => {
            expect.assertions(2);
            try {
                await service.getDictionaryById('321', 'testId');
            } catch (error) {
                expect(error).toBeInstanceOf(NotFoundException);
                expect(error).toHaveProperty(
                    'message',
                    'Dictionary not found',
                );
            }
        });
    
        it('should throw ForbiddenException', async () => {
            expect.assertions(2);
            try {
                await service.getDictionaryById('123', 'notOwnerId');
            } catch (error) {
                expect(error).toBeInstanceOf(ForbiddenException);
                expect(error).toHaveProperty(
                    'message',
                    'Access denied',
                );
            }
        });
    });

    describe('When try to update Dictionary',()=>{
        it('Should update dictionary', async () => {
            try {
                const dictionary = await service.updateDictionary(
                    {
                        name: "update",
                        description: null,
                        type: null,
                        dictionaryId: "123"
                    },
                    "testId"
                );
                expect(dictionary.name).toEqual("update");
            } catch (error) {
                console.log(error);
            }
        });
    
        it('Should throw ForbiddenException', async () => {
            expect.assertions(2);
            try {
                const dictionary = await service.updateDictionary(
                    {
                        name: "update",
                        description: null,
                        type: null,
                        dictionaryId: "123"
                    },
                    "notOwnerId"
                );
            } catch (error) {
                expect(error).toBeInstanceOf(ForbiddenException);
                expect(error).toHaveProperty(
                    'message',
                    'Access denied',
                );
            }
        });
    });

    describe('When try to remove dictionary',()=>{
        it('should return true', async ()=>{
            try {
                const result = await service.removeDictionary('123','testId');
                expect(result).toEqual(true);
            } catch(error) {
                console.log(error);
            }
        });

        it('should throw ForbiddenException', async () => {
            expect.assertions(2);
            try {
                await service.removeDictionary('123', 'notOwnerId');
            } catch (error) {
                expect(error).toBeInstanceOf(ForbiddenException);
                expect(error).toHaveProperty(
                    'message',
                    'Access denied',
                );
            }
        });
    });

});

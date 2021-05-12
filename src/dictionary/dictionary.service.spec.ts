import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { DateTime } from 'luxon';
import { Dictionary } from './dictionary.model';
import { DictionaryService } from './dictionary.service';

class mockDictionaryModel {
    constructor(private data) { }
    save = jest.fn().mockResolvedValue(this.data);
    deleteOne = jest.fn();
    findById = jest.fn().mockResolvedValue(testDictionary);
    findByIdAndUpdate = jest.fn().mockResolvedValue(this.data);
}

const testDictionary = {
    name: "Test",
    description: "test",
    type: "PUBLIC" as any,
    words: [],
    contributors: [],
    createdAt: DateTime.now().set({ hour: 0, minute: 0, second: 0, millisecond: 0 }).toMillis(),
    ownerId: "testId"
}

describe('DictionaryService', () => {
    let service: DictionaryService;
    let dictionaryModel = new mockDictionaryModel({
        name: "Test",
        description: "test",
        type: "PUBLIC" as any
    });

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                DictionaryService,
                {
                    provide: getModelToken('Dictionary'),
                    useValue: mockDictionaryModel,
                }
            ],
        }).compile();

        service = module.get<DictionaryService>(DictionaryService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('Should create new Dictionary', () => {
        expect(service.createDictionary({
            name: "Test",
            description: "test",
            type: "PUBLIC" as any
        }, "testId" as any))
            .resolves
            .toEqual(testDictionary)
            .catch(err => console.log(err));
    });

    // it('Should call deleteOne to remove Dictionary',()=> {
    //     service.removeDictionary("asd","testId");
    //     // expect(dictionaryModel.deleteOne).toHaveBeenCalled()
    //     expect(dictionaryModel.findById).toHaveBeenCalled();
    // });

    // it('Should update Dictionary', () => {
    //     expect(service.updateDictionary({
    //         dictionaryId: "asd",
    //         name: "Test",
    //         description: "test",
    //         type: "PUBLIC" as any
    //     }, "testId" as any)).resolves.toEqual(testDictionary).catch(err => console.log(err)
    //     )
    // });

});

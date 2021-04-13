import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateDictionaryParams, Dictionary } from './dictionary.model';
import { Model } from 'mongoose';
import { UserDocument } from 'src/auth/user.type';
import { ObjectID } from 'mongodb';

@Injectable()
export class DictionaryService {
    constructor(
        @InjectModel(Dictionary.name) private dictionaryModel: Model<UserDocument>,
    ) {}

    async createDictionary(params: CreateDictionaryParams, userId: ObjectID) {
        const { name, description, type } = params;
        const newDictionary = new this.dictionaryModel({
            name,
            description,
            type,
            ownerId: userId.toString(),
            words:[],
            contributors:[],
            createdAt: Date.now()
        });
        return await newDictionary.save();
        // const newDictionary = new Dictionary();
        // newDictionary.name = name;
        // newDictionary.ownerId = userId.toString();
        // newDictionary.description = description;
        // newDictionary.type = type;
        // newDictionary.words = [];
        // newDictionary.contributors = [];
        // newDictionary.createdAt = Date.now();
        // return await this.dictionaryRepository.save(newDictionary);
    }
}

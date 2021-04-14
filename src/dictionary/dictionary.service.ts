import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateDictionaryParams, Dictionary, DictionaryDocument } from './dictionary.model';
import { Model } from 'mongoose';
import { UserDocument } from 'src/auth/user.type';
import { ObjectID } from 'mongodb';

@Injectable()
export class DictionaryService {
    constructor(
        @InjectModel(Dictionary.name) private dictionaryModel: Model<DictionaryDocument>,
    ) {}

    private isOwner(userId: string, ownerId: string): boolean {
        return userId === ownerId;
    }

    private async getDictionaryData(id: string): Promise<Dictionary> {
        const dictionary = await this.dictionaryModel.findById(id);

        if (!dictionary) {
            throw new NotFoundException('Dictionary not found');
        }

        return dictionary;
    }

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
    }

    async removeDictionary(id: string, userId: string): Promise<boolean> {
        const dictionary = await this.getDictionaryData(id);
        const { ownerId } = dictionary;

        if (!this.isOwner(userId, ownerId)) {
            throw new ForbiddenException('Access denied');
        }

        await this.dictionaryModel.deleteOne({_id: id});
        return true;
    }

    
}

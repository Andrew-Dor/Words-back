import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateDictionaryParams, Dictionary, DictionaryDocument, UpdateDictionaryParams } from './dictionary.model';
import { Model } from 'mongoose';
import { ObjectID } from 'mongodb';

@Injectable()
export class DictionaryService {
    constructor(
        @InjectModel(Dictionary.name) private dictionaryModel: Model<DictionaryDocument>,
    ) { }

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
            words: [],
            contributors: [],
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

        await this.dictionaryModel.deleteOne({ _id: id });
        return true;
    }

    async updateDictionary(params: UpdateDictionaryParams, userId: string): Promise<Dictionary> {
        const { dictionaryId, name, description, type } = params;
        const dictionary = await this.getDictionaryData(dictionaryId);

        if (!this.isOwner(userId, dictionary.ownerId)) {
            throw new ForbiddenException('Access denied');
        }

        return await this.dictionaryModel.findByIdAndUpdate(
            dictionaryId,
            {
                name: name || dictionary.name,
                description: description || dictionary.description,
                type: type || dictionary.type,
            },
            {
                new: true,
            })
    }

}

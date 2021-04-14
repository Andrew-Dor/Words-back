import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver, Query, ID } from '@nestjs/graphql';
import { ObjectID } from 'mongodb';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { GetUserId } from 'src/utils/decorators/get-user-id.decorator';
import {
    AddWordParams,
    ContributorParams,
    CreateDictionaryParams,
    Dictionary,
    RemoveWordParams,
    UpdateDictionaryParams,
} from './dictionary.model';
import { DictionaryService } from './dictionary.service';

@Resolver(() => Dictionary)
@UseGuards(JwtAuthGuard)
export class DictionaryResolver {
    constructor(private dictionaryService: DictionaryService) {}

    @Mutation(() => Dictionary, { name: 'createDictionary' })
    async createDictionary(
        @Args('params', { type: () => CreateDictionaryParams })
        params: CreateDictionaryParams,
        @GetUserId()
        userId: ObjectID,
    ) {
        return await this.dictionaryService.createDictionary(params, userId);
    }

    @Mutation(() => Boolean, { name: 'removeDictionary' })
    async removeDictionary(
        @Args('id', { type: () => String })
        id: string,
        @GetUserId()
        userId: string,
    ) {
        return await this.dictionaryService.removeDictionary(id, userId);
    }

    @Mutation(() => Dictionary, { name: 'updateDictionary' })
    async updateDictionary(
        @Args('params', { type: () => UpdateDictionaryParams })
        params: UpdateDictionaryParams,
        @GetUserId()
        userId: string,
    ) {
        return await this.dictionaryService.updateDictionary(params, userId);
    }

    @Query(() => Dictionary, { name: 'getDictionaryById' })
    async getDictionaryById(
        @Args('id', { type: () => ID })
        id: string,
        @GetUserId()
        userId: string,
    ) {
        return await this.dictionaryService.getDictionaryById(id, userId);
    }

    @Mutation(() => Dictionary, { name: 'addWord' })
    async addWord(
        @Args('params', { type: () => AddWordParams })
        params: AddWordParams,
        @GetUserId()
        userId: string,
    ) {
        return await this.dictionaryService.addWord(params, userId);
    }

    @Mutation(() => Dictionary, { name: 'removeWord' })
    async removeWord(
        @Args('params', { type: () => RemoveWordParams })
        params: RemoveWordParams,
        @GetUserId()
        userId: string,
    ) {
        return await this.dictionaryService.removeWord(params, userId);
    }

    @Mutation(() => Dictionary, { name: 'addContributor' })
    async addContributor(
        @Args('params', { type: () => ContributorParams })
        params: ContributorParams,
        @GetUserId()
        userId: string,
    ) {
        return await this.dictionaryService.addContributor(params, userId);
    }

    @Mutation(() => Dictionary, { name: 'removeContributor' })
    async removeContributor(
        @Args('params', { type: () => ContributorParams })
        params: ContributorParams,
        @GetUserId()
        userId: string,
    ) {
        return await this.dictionaryService.removeContributor(params, userId);
    }
}

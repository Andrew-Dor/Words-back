import { Repository, EntityRepository } from "typeorm";
import { Word } from "./word.entity";
import { createWordParams } from "./word.type";

@EntityRepository(Word)
export class WordRepository extends Repository<Word> {
    async createWord(params: createWordParams): Promise<Word> {
        //TODO: add save word logic
    }
}
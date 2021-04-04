import { Column, Entity, ObjectID, ObjectIdColumn } from "typeorm";

@Entity()
export class Word {
    @ObjectIdColumn()
    id: ObjectID;

    @Column()
    word: string;

    @Column()
    translations: string[];

    @Column()
    examples: string[];

    @Column()
    tags: string[];
}
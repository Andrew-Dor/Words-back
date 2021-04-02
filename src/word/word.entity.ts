import { Column, Entity, ObjectIdColumn, PrimaryColumn } from "typeorm";

@Entity()
export class Word {
    @ObjectIdColumn()
    _id: string; //mongo db object id

    @PrimaryColumn()
    id: string;

    @Column()
    word: string;

    @Column()
    translations: string[];

    @Column()
    examples: string[];

    @Column()
    tags: string;
}
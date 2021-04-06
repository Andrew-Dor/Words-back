import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Entity()
export class User {
    @ObjectIdColumn()
    id: ObjectID;

    @Column()
    name: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    async validatePassword(password: string): Promise<boolean> {
        return bcrypt.compare(password, this.password);
    }
}

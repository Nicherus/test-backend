import { Factory, Seeder } from 'typeorm-seeding'
import { Connection } from 'typeorm'
import { User } from '../../entities/User'
import bcrypt from 'bcrypt';

export default class CreateUsers implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<any> {
        await connection
            .createQueryBuilder()
            .insert()
            .into(User)
            .values([
                { 
                    username: 'Niche', 
                    password:  bcrypt.hashSync('123456', 10), 
                    email: 'joao@email.com',
                    phone: 548348483
                },
                { 
                    username: 'Vieira', 
                    password:  bcrypt.hashSync('123456', 10), 
                    email: 'vieira@email.com',
                    phone: 674312238
                },
            ])
            .execute()
        }
}
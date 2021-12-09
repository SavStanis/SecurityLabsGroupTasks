import { Pool } from 'pg';
import { User } from '../entities/user';
import config from '../config';

const pool = new Pool(config.db);

export const saveUser = (user: User) => pool.query(
    `insert into users (login, password, encrypted_address_id, encrypted_phone_id)
    values ($1, $2, $3, $4)`,
    [user.login, user.password, user.encrypted_address_id, user.encrypted_phone_id]);

export const getUser = async (login: string): Promise<User | undefined> => {
    const { rows } = await pool.query(`select *
                                       from users
                                       where login = $1`, [login]);
    return rows[0];
};
import { User } from '../entities/user';
import { getUser, saveUser } from '../db/users';
import { promisify } from 'util';
import bcrypt from 'bcrypt';

export const login = async (user: User): Promise<boolean> => {
    const dbUser = await getUser(user.login);
    if (!dbUser) {
        return false;
    }
    const compare = promisify(bcrypt.compare);
    return await compare(user.password, dbUser.password);
};

export const register = async (user: User): Promise<boolean> => {
    const existingUser = await getUser(user.login);
    if (existingUser) {
        return false;
    }
    const saltRounds = 10;
    const hash = promisify(bcrypt.hash);
    user.password = await hash(user.password, saltRounds);
    await saveUser(user);
    return true;
};
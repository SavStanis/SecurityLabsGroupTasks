import { User } from '../entities/user';
import { getUser, saveUser } from '../db/users';
import { promisify } from 'util';
import bcrypt from 'bcrypt';
import {UserDto} from "../dto/user.dto";
import {decrypt, encrypt} from "../crypto";
import {getEncryptedDataById, saveEncryptedData} from "../db/encrypted-data";

export const login = async (user: User): Promise<UserDto | undefined> => {
    const dbUser = await getUser(user.login);
    if (!dbUser) {
        return undefined;
    }
    const compare = promisify(bcrypt.compare);
    const matched = await compare(user.password, dbUser.password);
    if (!matched) {
        return undefined;
    }

    const encryptedAddress = await getEncryptedDataById(dbUser.encrypted_address_id);
    const encryptedPhone = await getEncryptedDataById(dbUser.encrypted_phone_id);

    const address = decrypt(encryptedAddress.data, encryptedAddress.iv, encryptedAddress.tag);
    const phone = decrypt(encryptedPhone.data, encryptedPhone.iv, encryptedPhone.tag);

    return {
        login: dbUser.login,
        address: address,
        phone: phone,
    }
};

export const register = async (userDto: UserDto): Promise<boolean> => {
    const existingUser = await getUser(userDto.login);
    if (existingUser) {
        return false;
    }
    const saltRounds = 10;
    const hash = promisify(bcrypt.hash);
    const hashedPassword = await hash('' + userDto.password, saltRounds);
    const [encAddress, encAddrIv, encAddrTag] = await encrypt(userDto.address);
    const encryptedAddressId = await saveEncryptedData({
        tag: encAddrTag.toString(),
        data: encAddress.toString() ,
        iv: encAddrIv.toString(),
    });

    const [encPhone, encPhoneIv, encPhoneTag] = await encrypt(userDto.phone);
    const encryptedPhoneId = await saveEncryptedData({
        tag: encPhoneTag.toString(),
        data: encPhone.toString() ,
        iv: encPhoneIv.toString(),
    });

    const user: User = {
        login: userDto.login,
        password: hashedPassword,
        encrypted_address_id: encryptedAddressId,
        encrypted_phone_id: encryptedPhoneId,
    }

    await saveUser(user);
    return true;
};

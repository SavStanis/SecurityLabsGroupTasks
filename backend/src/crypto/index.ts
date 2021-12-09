import crypto from "crypto";
import {promisify} from "util";

const ALGO = 'aes-256-gcm';
const BASE_64 = 'base64';

const KEY = process.env.ENC_KEY || '5caa1272167beaedf85e70848866f53b0d0dd478211e00f05dc2d148608f0eba';
const KEY_BUFFER = Buffer.from(KEY, 'hex');

export const encrypt = async (data: string) => {
    const iv = await promisify(crypto.randomFill)(new Buffer(16)) as Buffer;
    const cipher = crypto.createCipheriv(ALGO, KEY_BUFFER, iv);

    let enc = cipher.update(data, 'utf8', BASE_64);
    enc += cipher.final(BASE_64);

    return [enc, iv.toString(BASE_64), cipher.getAuthTag().toString(BASE_64)];
};

export const decrypt = (encoded: string, iv: string, tag: string) => {
    const decipher = crypto.createDecipheriv(ALGO, KEY_BUFFER, Buffer.from(iv, BASE_64));
    decipher.setAuthTag(Buffer.from(tag, BASE_64));
    let str = decipher.update(encoded, BASE_64, 'utf8');
    str += decipher.final('utf8');

    return str;
}

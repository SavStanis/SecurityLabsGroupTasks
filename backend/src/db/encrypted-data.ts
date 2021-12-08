import {Pool} from "pg";
import config from "../config";
import {EncryptedData} from "../entities/encrypted-data";

const pool = new Pool(config.db);

export const saveEncryptedData = async (encryptedData: EncryptedData): Promise<number> => {
    const { rows } = await pool.query(
        `insert into encrypted_data (data, iv, tag)
         values ($1, $2, $3) returning id`,
        [encryptedData.data, encryptedData.iv, encryptedData.tag]
    );

    return rows[0].id;
}
export const getEncryptedDataById = async (id: number): Promise<EncryptedData | undefined> => {
    const { rows } = await pool.query(
        `select * from encrypted_data
        where id = $1`,
        [id]
    );

    return rows[0];
}

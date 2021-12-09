export interface User {
    login: string;
    password: string;
    encrypted_address_id?: number;
    encrypted_phone_id?: number;
}
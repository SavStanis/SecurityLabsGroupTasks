import { FastifySchema } from 'fastify';

export const registerSchema: FastifySchema = {
    body: {
        type: 'object',
        required: ['login', 'password', 'address', 'phone'],
        properties: {
            login: {
                type: 'string',
                minLength: 5,
                maxLength: 20
            },
            password: {
                type: 'string',
                pattern: '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,20}$',
            },
            address: {
                type: 'string',
            },
            phone: {
                type: 'string',
            },
        }
    }
};
export const loginSchema: FastifySchema = {
    body: {
        type: 'object',
        required: ['login', 'password'],
        properties: {
            login: {
                type: 'string',
            },
            password: {
                type: 'string',
            }
        }
    }
};
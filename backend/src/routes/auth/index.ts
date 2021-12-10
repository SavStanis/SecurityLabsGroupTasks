import { FastifyPluginCallback, FastifyReply, FastifyRequest } from 'fastify';
import { User } from '../../entities/user';
import * as auth from '../../services/auth';
import { loginSchema, registerSchema } from './schemas';
import {UserDto} from "../../dto/user.dto";

type LoginRequest = FastifyRequest<{ Body: User }>
type RegisterRequest = FastifyRequest<{ Body: UserDto }>;

const login = async (request: LoginRequest, reply: FastifyReply) => {
    const user = await auth.login(request.body);
    if (user) {
        await reply.status(200).send({ ok: true, user: user });
    } else {
        await reply.status(200).send({ ok: false, errors: ['Invalid username or password'] });
    }
};

const register = async (request: RegisterRequest, reply: FastifyReply) => {
    const registered = await auth.register(request.body);
    if (registered) {
        await reply.status(200).send({ ok: true });
    } else {
        await reply.status(200).send({ ok: false, errors: ['Username is already taken'] });
    }
};

export const plugin: FastifyPluginCallback = (fastify, options, done) => {
    fastify.post('/login', {
        schema: loginSchema,
        config: {
            rateLimit: {
                max: 20,
                timeWindow: '1 minute'
            }
        }}, login);

    fastify.post('/register', {
        schema: registerSchema,
        config: {
            rateLimit: {
                max: 50,
                timeWindow: '1 minute'
            }
        }
    }, register);
    done();
};


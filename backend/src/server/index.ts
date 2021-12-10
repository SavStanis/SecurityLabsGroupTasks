import { fastify, FastifyHttpsOptions, FastifyServerOptions } from 'fastify';
import { plugin as authRoutes } from '../routes/auth';
import fastifySwagger from 'fastify-swagger';
import cors from 'fastify-cors';
import { readFileSync } from 'fs';
import { join } from 'path';
import config from './../config';
import fastify_rate_limit from 'fastify-rate-limit';

const opts: FastifyHttpsOptions<any> | FastifyServerOptions<any> = {
    logger: true,
    https: {
        key: readFileSync(join(__dirname, '..', '..', 'certs', 'key.pem')),
        cert: readFileSync(join(__dirname, '..', '..', 'certs', 'cert.pem')),
        passphrase: config.tls.passphrase,
    }
};
if (!config.useHttps) {
    delete opts.https;
}
export const server = fastify(opts);
server.register(cors, {
    origin: '*',
    methods: ['GET', 'PUT', 'POST']
});

server.register(fastify_rate_limit, {
    global: false,
    max: 300,
});

server.register(fastifySwagger, {
    routePrefix: '/swagger',
    swagger: {
        info: {
            title: 'SecurityLabsGroupTasks',
            description: 'Swagger',
            version: '0.1.0'
        },
        schemes: ['http'],
        consumes: ['application/json'],
        produces: ['application/json'],
        definitions: {
            User: {
                type: 'object',
                required: ['login', 'password'],
                properties: {
                    login: { type: 'string' },
                    password: { type: 'string' },
                }
            }
        },
    },
    uiConfig: {
        docExpansion: 'full',
        deepLinking: false,
        tryItOutEnabled: true,
    },
    staticCSP: true,
    transformStaticCSP: _ => _,
    exposeRoute: true,
    uiHooks: {
        onRequest: (_request, _reply, next) => next(),
        preHandler: (_request, _reply, next) => next(),
    }
});
server.register(authRoutes);

server.ready(err => {
    if (err) throw err;
    server.swagger();
});
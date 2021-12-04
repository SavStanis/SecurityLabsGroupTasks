import { fastify } from 'fastify';
import { plugin as authRoutes } from '../routes/auth';
import fastifySwagger from 'fastify-swagger';

export const server = fastify({ logger: true });
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
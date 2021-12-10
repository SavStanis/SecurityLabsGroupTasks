export default {
    port: process.env.HTTP_PORT || 3000,
    useHttps: process.env.USE_HTTPS || true,
    db: {
        user: process.env.DATABASE_USER || 'postgres',
        port: +(process.env.DATABASE_PORT || 5432),
        password: process.env.DATABASE_PASSWORD || '1111',
        host: process.env.DATABASE_HOST || 'localhost',
        database: process.env.DATABASE_NAME || 'sample_auth',
    },
    tls: {
        passphrase: process.env.TLS_PASSPHRARE || '1111',
    }
};
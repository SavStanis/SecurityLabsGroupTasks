import { server } from './server';

server.listen(process.env.PORT || 8080)
    .then(s => console.log(`Server listening on ${s}`));
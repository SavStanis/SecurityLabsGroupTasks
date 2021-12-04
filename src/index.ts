import { server } from './server';

server.listen(process.env.PORT || 3000)
    .then(s => console.log(`Server listening on ${s}`));
import path from 'path';

import cors, { CorsOptions } from 'cors';
import express from 'express';
import { createHandler } from 'graphql-http/lib/use/express';

import schema from './graphql/schema';

const app = express();
const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 8080;
const hostname = '0.0.0.0';
const corsOptions: CorsOptions = {
  origin: 'https://little-alchemy-two-web.netlify.app',
};

app.use('/graphql', cors(corsOptions), createHandler({ schema }));

app.get('/graphiql', (_, res) => {
  res.sendFile(path.join(__dirname, 'graphiql.html'));
});

app.listen({ port, hostname }, () => {
  console.log(`server started at http://${hostname}:${port}`);
});

export default app;

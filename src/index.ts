import express from 'express';
import GraphQLHTTP from 'express-graphql';

import schema from './graphql/schema';

const app = express();
const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 8080;
const hostname = '0.0.0.0';

app.use(
  '/graphql',
  GraphQLHTTP({
    schema,
    graphiql: true,
  })
);

app.listen(port, hostname, () => {
  console.log(`server started at http://${hostname}:${port}`);
});

export default app;

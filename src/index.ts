import express from 'express';
import GraphQLHTTP from 'express-graphql';

import schema from './graphql/schema';

const app = express();
const port = 8080;

app.use(
  '/graphql',
  GraphQLHTTP({
    schema,
    graphiql: true,
  })
);

app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});

export default app;

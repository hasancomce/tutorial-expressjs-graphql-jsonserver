const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const MyGraphQLSchema = require('./schema');

const app = express();

app.use(
  '/graphql',
  graphqlHTTP({
    schema: MyGraphQLSchema,
    graphiql: true,
  }),
);
 
app.listen(4000, () => console.log("Server is running at port 4000"));
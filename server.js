const { createServer } = require("http");
const { createSchema, createYoga } = require('graphql-yoga');

const schema = createSchema({
  typeDefs: /* GraphQL */ `
    type Query {
      hello: String
    }
    type Mutation {
      hello: String
    }
    type Subscription {
      ticker: Int
    }
  `,
  resolvers: {
    Query: {
      hello: () => 'Hello GraphQL!'
    },
    Mutation: {
      hello: () => 'Hello GraphQL!'
    },
    Subscription: {
      ticker: {
        subscribe: async function* (root, args, ctx, info) {
          while (true) {
            await new Promise(resolve => setTimeout(resolve, 1000));
            yield { ticker: Math.floor(Math.random() * 1000) };
          }
        }
      }
    }
  }
});

const yoga = createYoga({
  schema,
  maskedErrors: false,
  graphiql: true,
  graphqlEndpoint: '/graphql',
  landingPage: true,
  plugins: []
});

const server = createServer(yoga);

server.listen(4000, () => console.log("Server started on http://localhost:4000"));
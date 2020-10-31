import dotenv from 'dotenv-flow';
import express from 'express';
import cors from 'cors';
import { ApolloServer, gql } from 'apollo-server-express';

import { getConnection } from './libs/connection';

import rootResolver from './modules/rootResolver';

dotenv.config();

const typeDefs = gql`
  type Query {
    pomodoro(communicationId: String!): Pomodoro
    users: [User!]!
    user(user_id: Int!): User
  }

  type Pomodoro {
    position: String!
    secondsSinceStart: Int!
    ids: Ids!
  }

  type Ids {
    communicationId: String!
    shareId: String!
  }

  type User {
    user_id: Int!
    email: String!
  }

  type Mutation {
    SignIn(email: String!, password: String!): User!

    SignUp(email: String!, password: String!): User!

    UpdatePomodoro(
      running: Boolean!
      position: String!
      communicationId: String!
      shareId: String!
    ): Pomodoro!
  }

  type AuthInfo {
    token: String!
  }
`;

const main = async () => {
  const app = express();

  app.disable('x-powered-by');
  app.use(cors());

  let dbConnection = null;

  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers: rootResolver,
    context: async ({ req, res }) => {
      if (!dbConnection) {
        dbConnection = await getConnection();
      }
      const auth = req.headers.Authorization || '';

      return {
        req,
        res,
        dbConnection,
        auth,
      };
    },
    playground: true,
  });

  apolloServer.applyMiddleware({ app, cors: false });

  const port = process.env.PORT || 4000;

  app.get('/', (_, res) => res.redirect('/graphql'));

  app.listen(port, () => {
    console.info(`Server started at http://localhost:${port}/graphql`);
  });
};

main();

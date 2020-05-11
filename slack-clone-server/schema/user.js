import { gql } from 'apollo-server-express';

export default gql`

  type User {
    id: Int!
    username: String!
    email: String!
    message: Message!
  }

  type Query {
    getUser(id: Int!): User!
    allUsers: [User!]!
  }

  type Mutation {
    createUser(username: String!, email: String!, password: String!): User!
  }
`;
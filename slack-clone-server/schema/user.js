// import { gql } from 'apollo-server-express';

export default `

  type User {
    id: Int!
    email: String!
    message: Message!
  }

  type Query {
    getUser(id: Int!): User!
    allUsers(id: Int!): [User!]!
  }

  type Mutation {
    createUser(username: String!, email: String!, password: String!): User!
  }
`;
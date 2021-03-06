import { gql } from 'apollo-server-express';

export default gql`
  type Team {
    owner: User!
    members: [User]!
    channel: [Channel!]!
  }

  # type Query {

  # }

  type Mutation {
    createTeam(name: String!): Boolean!
  }
`;
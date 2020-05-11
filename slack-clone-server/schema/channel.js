import { gql } from 'apollo-server-express';

export default gql`
  type Channel {
    id: Int!
    name: String!
    public: Boolean!
    message: [Message!]!
    users: [User!]!
  }

  type Mutation {
    createChannel(teamId: Int!, name: String!, public: Boolean=false): Boolean!
  }
`;
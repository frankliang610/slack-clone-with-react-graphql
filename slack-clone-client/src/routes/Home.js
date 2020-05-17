import React from 'react';
import { graphql } from 'react-apollo';
import { gql } from 'apollo-boost';

// eslint-disable-next-line
const allUsersQuery = gql`
  {
    allUsers {
      id,
      username
    }
  }
`;

const Home = ({
  data: {
    loading,
    allUsers
  }
}) => (
    loading ? null : allUsers.map(u => <h2 key={u.id}>{u.username}</h2>)
  );


export default graphql(allUsersQuery)(Home);

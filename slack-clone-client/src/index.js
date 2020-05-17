import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient, { gql } from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';

import Routes from './routes';

const client = new ApolloClient({
  uri: 'http://localhost:3003/graphql',
});

client
  .query({
    query: gql`
      {
        allUsers {
          id,
          username
        }
      }
    `
  })
  .then(result => console.log(result));

const App = () => (
  <ApolloProvider client={client}>
    <Routes />
  </ApolloProvider>
);

ReactDOM.render(
  <App />,
  document.getElementById('root')
);


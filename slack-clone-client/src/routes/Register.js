import React, { Component } from 'react';
import { Form, Container, Header, Input, Button, Message } from 'semantic-ui-react';
import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';

class Register extends Component {
  state = {
    username: '',
    usernameError: '',
    email: '',
    emailError: '',
    password: '',
    passwordError: ''

  };
  onChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };
  onSubmit = async () => {
    this.setState({
      usernameError: '',
      emailError: '',
      passwordError: ''
    })
    const { username, email, password } = this.state;
    const response = await this.props.mutate({
      variables: { username, email, password }
    });

    const { ok, errors } = response.data.register;

    if (ok) {
      this.props.history.push('/');
    } else {
      const err = {};
      errors.forEach(({ path, message }) => {
        err[`${path}Error`] = message;
      });
      this.setState(err);
    }
    console.log(response);
  };
  render() {
    const { username, email, password, usernameError, emailError, passwordError } = this.state;

    const errorList = [];
    if (usernameError) {
      errorList.push(usernameError);
    }

    if (emailError) {
      errorList.push(emailError);
    }

    if (passwordError) {
      errorList.push(passwordError);
    }

    return (
      <Container text>
        <Header as="h2">Register</Header>
        <Form>
          <Form.Field error={!!usernameError}>
            <Input
              name="username"
              type="text"
              onChange={this.onChange}
              value={username}
              placeholder="Username"
              fluid
            />
          </Form.Field>
          <Form.Field error={!!emailError}>
            <Input
              name="email"
              type="email"
              onChange={this.onChange}
              value={email}
              placeholder="Email"
              fluid
            />
          </Form.Field>
          <Form.Field error={!!passwordError}>
            <Input
              name="password"
              type="password"
              onChange={this.onChange}
              value={password}
              placeholder="Password"
              fluid
            />
          </Form.Field>
          <Button onClick={this.onSubmit}>Submit</Button>
        </Form>
        {errorList.length ? (
          <Message
            error
            header='There was some errors with your submission'
            list={errorList}
          />
        ) : null}
      </Container>
    );
  }
}

const registerMutation = gql`
  mutation($username: String!, $email: String!, $password: String!) {
    register(username: $username, email: $email, password: $password) {
      ok
      errors {
        path
        message
      }
    }
  }
`;

export default graphql(registerMutation)(Register);
import React, { Component } from 'react';
import { Form, Container, Header, Input, Button, Message } from 'semantic-ui-react';
import { extendObservable } from "mobx";
import { observer } from "mobx-react";
import { graphql } from 'react-apollo';
import { gql } from 'apollo-boost';


class Login extends Component {
  constructor(props) {
    super(props);

    extendObservable(this, {
      email: '',
      password: '',
      errors: {}
    });
  }

  onSubmit = async () => {
    const { email, password } = this;
    const response = await this.props.mutate({
      variables: {
        email,
        password
      }
    });

    console.log('response :>> ', response);
    const { ok, token, refreshToken, errors } = response.data.login;
    if (ok) {
      localStorage.setItem('token', token);
      localStorage.setItem('refreshToken', refreshToken);
      this.props.history.push('/');
    } else {
      const err = {};
      errors.forEach(({ path, message }) => {
        err[`${path}Error`] = message;
      });
      this.errors = err;
    }
    console.log(response);
  }

  onChange = e => {
    const { name, value } = e.target;
    this[name] = value;
  }

  render() {
    const {
      email,
      password,
      errors: {
        emailError,
        passwordError
      }
    } = this;

    const errorList = [];

    if (emailError) {
      errorList.push(emailError);
    }

    if (passwordError) {
      errorList.push(passwordError);
    }

    return (
      <Container text>
        <Header as="h2">Login</Header>
        <Form>
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
            header='There was some errors with your login'
            list={errorList}
          />
        ) : null}
      </Container>
    );
  }
};

const loginMutation = gql`
  mutation ($email: String!, $password: String!) {
    login(email: $email, password: $password){
      ok
      token
      refreshToken
      errors{
        path
        message
      }
    }
  }
`;

export default graphql(loginMutation)(observer(Login));
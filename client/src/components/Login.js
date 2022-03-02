import React, { useState } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import { gql, useMutation } from '@apollo/client';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthDispatch } from '../context/auth';

const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      id
      username
      email
      createdAt
      token
    }
  }
`

export default function Login() {
  const [variables, setVariables] = useState({
    username: '',
    password: '',
  })
  const [errors, setErrors] = useState({});

  const dispatch = useAuthDispatch()
  let navigate = useNavigate();

  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    onError: (error) => setErrors(error && error.graphQLErrors[0] ? error.graphQLErrors[0].extensions.errors : {}),
    onCompleted(data) {
      dispatch({ type: 'LOGIN', payload: data.login })
      window.location.href = '/';
    },
  })

  const submitLoginForm = (e) => {
    e.preventDefault()

    loginUser({ variables })
  }

  return (
    <Row className="bg-white py-5 justify-content-center">
      <Col sm={8} md={6} lg={4}>
        <h1 className="text-center">Login</h1>
        <Form onSubmit={submitLoginForm}>
          <Form.Group>
            <Form.Label className={errors.username && 'text-danger'}>
              {errors.username ?? 'Username'}
            </Form.Label>
            <Form.Control
              type="text"
              value={variables.username}
              className={errors.username && 'is-invalid'}
              onChange={(e) =>
                setVariables({ ...variables, username: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group>
            <Form.Label className={errors.password && 'text-danger'}>
              {errors.password ?? 'Password'}
            </Form.Label>
            <Form.Control
              type="password"
              value={variables.password}
              className={errors.password && 'is-invalid'}
              onChange={(e) =>
                setVariables({ ...variables, password: e.target.value })
              }
            />
          </Form.Group>
          <div className="text-center">
            <Button variant="success" type="submit" disabled={loading}>
              {loading ? 'loading..' : 'Login'}
            </Button>
            <br />
            <small>
              Don't have an account? <Link to="/register">Register</Link>
            </small>
          </div>
        </Form>
      </Col>
    </Row>
  )
}

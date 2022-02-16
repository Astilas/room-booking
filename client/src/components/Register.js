import React, { useState } from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import { gql, useMutation } from '@apollo/client';
import { Link, useNavigate } from 'react-router-dom';

const REGISTER_USER = gql`
  mutation register(
      $username: String!
      $email: String!
      $password: String!
      $confirmPassword: String!
    ) {
      register(
        username: $username 
        email: $email 
        password: $password 
        confirmPassword: $confirmPassword
      ) {
        username
        email
        createdAt
      }
    }
`;

export default function Register(props) {

  const [variables, setVariables] = useState({
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
  })

  const [ errors, setErrors ] = useState({})
  let navigate = useNavigate();
  const [registerUser, { loading }] = useMutation(REGISTER_USER, {
    update: (_, __) => navigate('/login'),
    onError: (error) => setErrors(error && error.graphQLErrors[0] ? error.graphQLErrors[0].extensions.errors : {}),
  });

  const submitRegisterForm = (e) => {
    e.preventDefault()

    registerUser({ variables })
  }

  return (
    <Container>
        <Row className="bg-white py-5 justify-content-center">
            <Col sm={8} md={6} lg={4}>
                <h1 className="center">Register</h1>
                <Form onSubmit={submitRegisterForm}>
                    <Form.Group>
                        <Form.Label className={errors.email && 'text-danger'}>
                            {errors.email ?? 'Email address'}
                        </Form.Label>
                        <Form.Control
                            type="email"
                            value={variables.email}
                            className={errors.email && 'is-invalid'}
                            onChange={(e) =>
                                setVariables({ ...variables, email: e.target.value })
                            }
                        />
                    </Form.Group>
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
                        <Form.Group>
                            <Form.Label className={errors.confirmPassword && 'text-danger'}>
                            {errors.confirmPassword ?? 'Confirm password'}
                            </Form.Label>
                            <Form.Control
                                type="password"
                                value={variables.confirmPassword}
                                className={errors.confirmPassword && 'is-invalid'}
                                onChange={(e) => 
                                    setVariables({
                                        ...variables,
                                        confirmPassword: e.target.value,
                                    })
                                }
                            />
                    </Form.Group>
                    <div className="center mt-3">
                        <Button variant="success" type="submit" disabled={loading}>
                            {loading ? 'loading..' : 'Register'}
                        </Button>{' '}
                        <Col>Already have an account? <Link to="/login">Log in !</Link></Col>
                    </div>
                </Form>
            </Col>
        </Row>
    </Container>         
)
}

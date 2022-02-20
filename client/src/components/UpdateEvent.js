import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { gql, useMutation } from '@apollo/client';
import { Link, useNavigate, useParams } from 'react-router-dom';

const UPDATE_EVENT = gql`
  mutation updateEvent(
      $id: ID!
      $title: String!
      $description: String!
      $date: String!
      $begin_hour: String!
      $end_hour: String!
      $room_id: ID!
    ) {
      updateEvent(
        id: $id
        title: $title 
        description: $description 
        date: $date 
        begin_hour: $begin_hour
        end_hour: $end_hour
        room_id: $room_id
      ) {
        id
        title
        description
        date
        begin_hour
        end_hour
        room_id {
            id
        }
      }
    }
`;

export default function UpdateEvent() {

  const { id } = useParams(); // Unpacking and retrieve id
  
  const [variables, setVariables] = useState({
    id: parseInt(id),
    title: '',
    description: '',
    date: '',
    begin_hour: '',
    end_hour: '',
    room_id: '',
  });

  const [ errors, setErrors ] = useState({})
  let navigate = useNavigate();
  const [updateEvent, { loading }] = useMutation(UPDATE_EVENT, {
    update: (_, __) => navigate('/'),
    onError: (error) => setErrors(error && error.graphQLErrors[0] ? error.graphQLErrors[0].extensions.errors : {}),
  });

  const submitEventForm = (e) => {
    e.preventDefault();

    updateEvent({ variables });
  };

  return (
    <Container>
        <Row className="bg-white py-5 justify-content-center">
            <Col sm={8} md={6} lg={4}>
                <h1 className="center">Update an event</h1>
                <Form onSubmit={submitEventForm}>
                    <Form.Group>
                        <Form.Label className={errors.title && 'text-danger'}>
                            {errors.title ?? 'Title'}
                        </Form.Label>
                        <Form.Control
                            type="text"
                            value={variables.title}
                            className={errors.title && 'is-invalid'}
                            onChange={(e) =>
                                setVariables({ ...variables, title: e.target.value })
                            }
                            required
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label className={errors.description && 'text-danger'}>
                            {errors.description ?? 'Description'}
                        </Form.Label>
                        <Form.Control
                            type="text-area"
                            value={variables.description}
                            className={errors.description && 'is-invalid'}
                            onChange={(e) =>
                                setVariables({ ...variables, description: e.target.value })
                            }
                            required
                        />
                    </Form.Group>
                        <Form.Group>
                            <Form.Label className={errors.date && 'text-danger'}>
                                {errors.date ?? 'Date'}
                            </Form.Label>
                        <Form.Control
                            type="date"
                            value={variables.date}
                            className={errors.date && 'is-invalid'}
                            onChange={(e) =>
                                setVariables({ ...variables, date: e.target.value })
                            }
                            required
                        />
                    </Form.Group>
                        <Form.Group>
                            <Form.Label className={errors.begin_hour && 'text-danger'}>
                            {errors.begin_hour ?? 'Begin hour'}
                            </Form.Label>
                            <Form.Control
                                type="time"
                                value={variables.begin_hour}
                                className={errors.begin_hour && 'is-invalid'}
                                onChange={(e) => 
                                    setVariables({
                                        ...variables,
                                        begin_hour: e.target.value,
                                    })
                                }
                                required
                            />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label className={errors.end_hour && 'text-danger'}>
                            {errors.end_hour ?? 'End hour'}
                        </Form.Label>
                        <Form.Control
                            type="time"
                            value={variables.end_hour}
                            className={errors.end_hour && 'is-invalid'}
                            onChange={(e) =>
                                setVariables({ ...variables, end_hour: e.target.value })
                            }
                            required
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label className={errors.room_id && 'text-danger'}>
                            {errors.room_id ?? 'Which room ?'}
                        </Form.Label>
                        <Form.Control
                            as="select"
                            value={variables.room_id}
                            className={errors.room_id && 'is-invalid'}
                            onChange={(e) =>
                                setVariables({ ...variables, room_id: e.target.value })
                            }
                            required
                        >
                                    <option value="">Choose...</option>
                                    <option value="1">Party</option>
                                </Form.Control>
                    </Form.Group>
                    <div className="center mt-3">
                        <Button variant="success" type="submit" disabled={loading}>
                            {loading ? 'loading..' : 'Update'}
                        </Button>{' '}
                        <Col>Go back <Link to="/">home</Link></Col>
                    </div>
                </Form>
            </Col>
        </Row>
    </Container>         
  )
}

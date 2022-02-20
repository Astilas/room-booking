import React, { useState } from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import { gql, useQuery, useMutation } from '@apollo/client';
import { Link, useNavigate } from 'react-router-dom';
import SelectRoom from './SelectRoom';


const CREATE_EVENT = gql`
  mutation createEvent(
      $title: String!
      $description: String!
      $date: String!
      $begin_hour: String!
      $end_hour: String!
      $room_id: ID!
    ) {
      createEvent(
        title: $title 
        description: $description 
        date: $date 
        begin_hour: $begin_hour
        end_hour: $end_hour
        room_id: $room_id
      ) {
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

export default function CreateEvent(props) {

  const [variables, setVariables] = useState({
    title: '',
    description: '',
    date: '',
    begin_hour: '',
    end_hour: '',
    room_id: '',
  })

  const [ errors, setErrors ] = useState({})
  let navigate = useNavigate();

  const [createEvent, { loading }] = useMutation(CREATE_EVENT, {
    update: (_, __) => navigate('/'),
    onError: (error) => setErrors(error && error.graphQLErrors[0] ? error.graphQLErrors[0].extensions.errors : {}),
  });

  const handleRoomChange = (roomId) => {
    setVariables({ ...variables, room_id: roomId })  
  }

  const submitEventForm = (e) => {
    e.preventDefault();

    createEvent({ variables });
  }

  return (
    <Container>
        <Row className="bg-white py-5 justify-content-center">
            <Col sm={8} md={6} lg={4}>
                <h1 className="center">Create an event</h1>
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
                        <SelectRoom errors={errors} handleRoomChange={handleRoomChange} />
                    </Form.Group>
                    <div className="center mt-3">
                        <Button variant="success" type="submit" disabled={loading}>
                            {loading ? 'loading..' : 'Create'}
                        </Button>{' '}
                        <Col>Go back <Link to="/">home</Link></Col>
                    </div>
                </Form>
            </Col>
        </Row>
    </Container>         
)
}

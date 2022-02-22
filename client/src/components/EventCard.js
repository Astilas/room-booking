import React, { useState } from 'react';
import { Row, Container, Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import { gql, useMutation } from '@apollo/client';
import { Link, useNavigate, useParams } from 'react-router-dom';

import { toast } from 'react-toastify';
const notify = () => toast('Your event has been removed');

export default function EventCard(props) {

  const notify = () => toast('Your event has been removed');
  const DELETE_EVENT = gql`
    mutation deleteEvent ($id: ID!){
      deleteEvent (id: $id)
    }
  `

  // const { id } = useParams(); // Unpacking and retrieve id

  const [ errors, setErrors ] = useState({})
  let navigate = useNavigate();
  const [deleteEvent, { loading }] = useMutation(DELETE_EVENT, {
    onCompleted: (_, __) => navigate('/'),
    onError: (error) => setErrors(error && error.graphQLErrors[0] ? error.graphQLErrors[0].extensions.errors : {}),
  });

  const handleDelete = () => {
    deleteEvent({ variables: { id: props.id } } )
  };

    return (
        <Row className="div-event">
          <Card bg="info" text="white" style={{ width: '30rem', height:'30rem' }}>
            <Card.Header>
              <h2>{props.title}</h2>
            </Card.Header>
            {/* <Card.Header>
              <h5>Description: {props.description}</h5>
            </Card.Header> */}
            <Card.Body className="card-body-css">
              <Card.Title>Le {props.date} à {props.begin_hour}</Card.Title>
              <Card.Text className="">
                {props.description}
              </Card.Text>
              <Card.Text className="">
                {props.end_hour}
              </Card.Text>
            </Card.Body>
            <Card.Footer>
              <Button onClick={() =>
                  navigate(`/update-event/${props.id}`)}>
                  Check event
              </Button>
              <Button
                className="icon-size"
                onClick={handleDelete}
              >
                Delete event
              </Button>
            </Card.Footer>
          </Card>
        </Row>
      );
  }
  
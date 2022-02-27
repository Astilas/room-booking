import React, { useState } from 'react';
import { Row, Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import { gql, useMutation } from '@apollo/client';
import {  useNavigate, useParams } from 'react-router-dom';
import { useRoomState, useRoomDispatch } from '../context/rooms';
import { useEventState } from '../context/events';

export default function EventCard(props) {

  const DELETE_EVENT = gql`
    mutation deleteEvent ($id: ID!){
      deleteEvent (id: $id)
    }
  `

  const UPDATE_ROOM = gql`
  mutation updateRoom(
      $id: ID!
      $availability: [String]!
    ) {
      updateRoom(
        id: $id
        availability: $availability
      ) {
        id
        name
        availability
      }
    }
`;

  const [ errors, setErrors ] = useState({})
  let navigate = useNavigate();
  const [deleteEvent, { loading }] = useMutation(DELETE_EVENT, {
    onCompleted: (_, __) => navigate('/'),
    onError: (error) => setErrors(error && error.graphQLErrors[0] ? error.graphQLErrors[0].extensions.errors : {}),
  });
  const roomDispatch = useRoomDispatch();
  const [updateRoom] = useMutation(UPDATE_ROOM, {
    onCompleted: (data) => 
        roomDispatch({ type: 'UPDATE_ROOM', payload: data.updateRoom }),
    // onError: (error) => setErrors(error && error.graphQLErrors[0] ? error.graphQLErrors[0].extensions.errors : {}),
  });
  
  const { events } = useEventState();
  const { rooms } = useRoomState();

  const handleDelete = () => {

    // Find in events the corresponding id 
    const selectEventDatas = events.find((event) => event.id === props.id)

    const selectRoomDatas = rooms.find((room) => room.id === selectEventDatas.room_id.id);

    const bookingHours = selectEventDatas.booking_hour;
    const availableHours = bookingHours.concat(selectRoomDatas.availability);

    // Use mutation delete Event
    deleteEvent({ variables: { id: props.id } } )
    updateRoom({ variables: { id: selectEventDatas.room_id.id, availability: availableHours} })
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
  
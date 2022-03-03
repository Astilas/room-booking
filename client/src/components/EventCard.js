import React, { useState } from 'react';
import { Row, Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import { gql, useMutation } from '@apollo/client';
import { useRoomState } from '../context/rooms';
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

  const [errors, setErrors] = useState({})

  const [deleteEvent] = useMutation(DELETE_EVENT, {
    onError: (error) => setErrors(error && error.graphQLErrors[0] ? error.graphQLErrors[0].extensions.errors : {}),
  });

  const [updateRoom] = useMutation(UPDATE_ROOM, {
    // onError: (error) => setErrors(error && error.graphQLErrors[0] ? error.graphQLErrors[0].extensions.errors : {}),
  });

  const { events } = useEventState();
  const { rooms } = useRoomState();

  const handleDelete = async () => {

    // Find in events the corresponding id 
    const selectEventDatas = events.find((event) => event.id === props.id)

    const selectRoomDatas = rooms.find((room) => room.id === selectEventDatas.room_id.id);

    const bookingHours = selectEventDatas.booking_hour;
    const availableHours = bookingHours.concat(selectRoomDatas.availability);

    // Use mutation update Room
    await updateRoom({ variables: { id: selectEventDatas.room_id.id, availability: availableHours } });
    // Use mutation delete Event
    await deleteEvent({ variables: { id: props.id } });
  };

  const arrayH = [];
  props.booking_hour.map((b_h) => arrayH.push(b_h));

  const splitArray = arrayH.map((item) => {
    return item.split('-');
  });
  const merged = [].concat.apply([], splitArray);
  const begin = merged[0];
  const end = merged[merged.length-1];

  return (
    <Row className="center-div">
      <Card bg="warning" text="white" style={{ width: '30rem', height: '20rem' }}>
        <Card.Header>
          <h2>{props.title}</h2>
        </Card.Header>
        <Card.Body className="card-body-css">
          <Card.Title>Le {props.date} de {begin}h à {end}h</Card.Title>
          <Card.Text className="">
            {props.description}
          </Card.Text>
          <Card.Text className="">
            {props.end_hour}
          </Card.Text>
        </Card.Body>
        <Card.Footer className="align-end">
          <Button
            variant="danger"
            className="icon-size"
            onClick={handleDelete}
          >
            Cancel booking
          </Button>
        </Card.Footer>
      </Card>
    </Row>
  );
}

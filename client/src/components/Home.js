import React, { Fragment, useEffect, useState } from 'react';
import { Row, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import EventList from './EventList';
import CreateEvent from './CreateEvent';
import { useAuthDispatch } from '../context/auth';
import { useEventDispatch } from '../context/events';
import { useRoomDispatch } from '../context/rooms';
import { useSubscription } from '@apollo/react-hooks';
import { gql } from '@apollo/client';

const NEW_EVENT = gql`
  subscription newEvent {
    newEvent {
      id
      title
      description
      date
      booking_hour
      begin_hour
      end_hour
      room_id {
        id
      }
      createdAt
    }
  }
`
const REMOVE_EVENT = gql`
  subscription removeEvent {
    removeEvent {
      mutation
      event {
        id
        title
        description
        date
        begin_hour
        end_hour
        createdAt
      }
    }
  }
`

const CHANGE_ROOM_AVAILABILITY = gql`
  subscription changeRoomAvailability {
    changeRoomAvailability {
        id
        name
        availability
    }
  }
`

export default function Home() {
  const dispatch = useAuthDispatch();
  const eventDispatch = useEventDispatch();
  const roomDispatch = useRoomDispatch();
  const [modalShow, setModalShow] = useState(false);

  let navigate = useNavigate();

  const closeModal = () => {
    setModalShow(false);
  };

  const { data: eventData, error: eventError } = useSubscription(NEW_EVENT)

  const { data: removeData, error: removeError } = useSubscription(
    REMOVE_EVENT
  )

  const { data: roomData, error: roomError } = useSubscription(CHANGE_ROOM_AVAILABILITY)

  useEffect(() => {
    if (eventError) console.log(eventError);

    if (eventData) {
      const event = eventData.newEvent;

      eventDispatch({
        type: 'ADD_EVENT',
        payload: {
          event,
        },
      })
    }
  }, [eventError, eventData]);

  useEffect(() => {
    if (removeError) console.log(removeError);

    if (removeData) {
      const event = removeData.removeEvent.event;

      eventDispatch({
        type: 'DELETE_EVENT',
        payload: {
          event,
        },
      })
    }
  }, [removeError, removeData]);

  useEffect(() => {
    if (roomError) console.log(roomError);

    if (roomData) {
      const room = roomData.changeRoomAvailability;

      roomDispatch({
        type: 'UPDATE_ROOM',
        payload: {
          room,
        },
      })
    }
  });

  const logout = () => {
    dispatch({ type: 'LOGOUT' })
    navigate('/login')
  }

  return (
    <Fragment>
        <Button variant="link" onClick={logout}>Logout</Button>
        <Button variant="link" onClick={() => setModalShow(!modalShow)}>Create an event</Button>
        <EventList />
        {modalShow && <CreateEvent closeModal={closeModal} />}
  </Fragment>
  )
}

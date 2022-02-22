import React, { Fragment, useEffect } from 'react';
import { Row, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import EventList from './EventList';

import { useAuthDispatch } from '../context/auth';
import { useEventDispatch } from '../context/events';
import { useSubscription } from '@apollo/react-hooks';
import { gql } from '@apollo/client';

const NEW_EVENT = gql`
  subscription newEvent {
    newEvent {
      id
      title
      description
      date
      begin_hour
      end_hour
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

export default function Home() {
  const dispatch = useAuthDispatch();
  const eventDispatch = useEventDispatch();

  let navigate = useNavigate();

  const { data: eventData, error: eventError } = useSubscription(NEW_EVENT)

  const { data: removeData, error: removeError } = useSubscription(
    REMOVE_EVENT
  )

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

  const logout = () => {
    dispatch({ type: 'LOGOUT' })
    navigate('/login')
  }

  return (
    <Fragment>
        <Row className="bg-white justify-content-around mb-1">
          <Link to="/login">
            <Button variant="link">Login</Button>
          </Link>
          <Link to="/register">
            <Button variant="link">Register</Button>
          </Link>
          <Link to="/create-event">
            <Button variant="link">Create an event</Button>
          </Link>
          <Button variant="link" onClick={logout}>
            Logout
          </Button>
        </Row>
        <EventList />
  </Fragment>
  )
}

import React, { Fragment } from 'react';
import { Row, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import EventList from './EventList';

import { useAuthDispatch } from '../context/auth';

export default function Home() {
  const dispatch = useAuthDispatch();

  let navigate = useNavigate();

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

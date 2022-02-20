import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';
import EventCard from './EventCard';

import { useEventDispatch, useEventState } from '../context/events';

const GET_EVENTS = gql`
  query getEvents {
    getEvents {
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

export default function EventList() {
  const dispatchEvent = useEventDispatch();
  const { events } = useEventState();

  let navigate = useNavigate();

  const { loading } = useQuery(GET_EVENTS, {
    onCompleted: (data) => {
        dispatchEvent({ type: 'GET_EVENTS', payload: data.getEvents })
    },
    onError: (err) => console.log("error", err),
  })

  let eventsMarkup;
  if (!events || loading) {
    eventsMarkup = <p>Loading..</p>
  } else if (events.length === 0) {
    eventsMarkup = <p>No events yet</p>
  } else if (events.length > 0) {
    eventsMarkup = events.map((event) => (
        <Col lg={5} md={12} sm={12} xs={9} className="margin-event" key={event.id}>
            <EventCard
                key={event.id}
                title={event.title}
                description={event.description}
                date={event.date}
                begin_hour={event.begin_hour}
                end_hour={event.end_hour}
            />
            <Button onClick={() =>
                navigate(`/update-event/${event.id}`)}>
                Check event
            </Button>
        </Col>
    ))
  }
  return (
      <Row className="bg-white">
        <Col xs={4}>{eventsMarkup}</Col>
      </Row>
  )
}

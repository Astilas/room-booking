import React, { useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
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

  const { loading: eventsLoading, data: eventsData } = useQuery(GET_EVENTS)

  useEffect(() => {
    if (eventsData) {
      dispatchEvent({
        type: 'GET_EVENTS',
        payload: eventsData.getEvents
      })
    }
  }, [eventsData])


  let eventsMarkup;
  if (!events|| eventsLoading) {
    eventsMarkup = <p>Loading..</p>
  } else if (events.length === 0) {
    eventsMarkup = <p>No events yet</p>
  } else if (events.length > 0) {
    eventsMarkup = events.map((event) => (
        <Col lg={5} md={12} sm={12} xs={9} className="margin-event" key={event.id}>
            <EventCard
                key={event.id}
                id={event.id}
                title={event.title}
                description={event.description}
                date={event.date}
                begin_hour={event.begin_hour}
                end_hour={event.end_hour}
            />
        </Col>
    ))
  }
  return (
      <Row className="bg-white">
        {eventsMarkup}
      </Row>
  )
}

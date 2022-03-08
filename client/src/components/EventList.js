import React, { useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { gql, useQuery } from '@apollo/client';
import EventCard from './EventCard';
import RoomCard from './RoomCard';

import { useEventDispatch, useEventState } from '../context/events';
import { useRoomDispatch, useRoomState } from '../context/rooms';
import { useAuthState } from '../context/auth';

const GET_EVENTS = gql`
  query getEvents ($user_id: ID!) {
    getEvents (user_id: $user_id){
        id
        title
        description
        date
        booking_hour
        begin_hour
        end_hour
        createdAt
        room_id {
          id
        }
    }
  }
`;

const GET_ROOMS = gql`
  query getRooms(
    $company: String!
    ){
    getRooms (
      company: $company
    ){
        id
        name
        availability
        company
      }
    }
`;

export default function EventList() {

  const dispatchEvent = useEventDispatch();
  const dispatchRoom = useRoomDispatch();
  const { events } = useEventState();
  const { rooms } = useRoomState();
  const { user } = useAuthState();
  const { id, company } = user;

  const { loading: eventsLoading, data: eventsData } = useQuery(GET_EVENTS,
    {
      variables: { user_id: id }
    });

  const { data: roomsData, loading: roomsLoading } = useQuery(GET_ROOMS, {
    variables: { company: company },
    onError: (err) => console.log(err),
  });

  useEffect(() => {
    if (eventsData) {
      dispatchEvent({
        type: 'GET_EVENTS',
        payload: eventsData.getEvents
      })
    }
  }, [eventsData])


  useEffect(() => {
    if (roomsData) {
      dispatchRoom({
        type: 'GET_ROOMS',
        payload: roomsData.getRooms
      })
    }
  }, [roomsData])


  let eventsMarkup;
  if (!events || eventsLoading) {
    eventsMarkup = <p>Loading..</p>
  } else if (events.length === 0) {
    eventsMarkup = <p>No boooking yet</p>
  } else if (events.length > 0) {
    eventsMarkup = events.map((event) => (
      <Col lg={5} md={12} sm={12} xs={9} className="margin-card" key={event.id}>
        <EventCard
          key={event.id}
          id={event.id}
          title={event.title}
          description={event.description}
          date={event.date}
          booking_hour={event.booking_hour}
          begin_hour={event.begin_hour}
          end_hour={event.end_hour}
        />
      </Col>
    ))
  }

  let roomsMarkup;
  if (!rooms || roomsLoading) {
    roomsMarkup = <p>Loading..</p>
  } else if (rooms.length === 0) {
    roomsMarkup = <p>No rooms available</p>
  } else if (rooms.length > 0) {
    roomsMarkup = rooms.map((room) => (
      room.availability.length > 0 ?
        <Col lg={3} md={6} sm={6} xs={12} className="margin-card" key={room.id}>
          <RoomCard
            key={room.id}
            id={room.id}
            name={room.name}
            availability={room.availability}
            company={room.company}
          />
        </Col>
        : ''
    ))
  }

  return (

    <Container>
      <h3 className="align-center title-rooms">Meeting rooms availability</h3>
      <Row className="center-div">
        {roomsMarkup}
      </Row>
      <h3 className="align-center title-events">Your bookings</h3>
      <Row className="gb-white center-div">
        {eventsMarkup}
      </Row>

    </Container>
  )
}

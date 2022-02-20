import React, { useState, useEffect } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { gql, useQuery } from '@apollo/client';

import { useRoomDispatch, useRoomState } from '../context/rooms';

const GET_ROOMS = gql`
  query getRooms{
    getRooms{
        id
        name
        availability
      }
    }
`;

export default function SelectRoom(props) {

    const dispatchRoom = useRoomDispatch();
    const { rooms } = useRoomState();
  
    const [ errors, setErrors ] = useState({});
    
    const { loading_rooms } = useQuery(GET_ROOMS, {
      onCompleted: (data) =>
          dispatchRoom({ type: 'GET_ROOMS', payload: data.getRooms }),
      onError: (err) => console.log(err),
    });

    let roomsMarkup;
    if (!rooms || loading_rooms) {
        roomsMarkup = "Loading rooms..."
    } else if (rooms.length === 0) {
        roomsMarkup = "No rooms available"
    } else if (rooms.length > 0) {
        roomsMarkup = 
        <Form.Control
            as="select"
            className={props.errors.room_id && 'is-invalid'}
            onChange={(e) =>
                props.handleRoomChange(e.target.value)
            }
            
        >       
            <option value="">Select a room...</option>
            {rooms.map((room) => (
                <option key={room.id} value={room.id}>{room.name}</option>
            ))}
        </Form.Control>
    }

    return (
        <Form.Group>
            <Form.Label className={errors.room_id && 'text-danger'}>
                {errors.room_id ?? 'Which room ?'}
            </Form.Label>
            {roomsMarkup}
        </Form.Group>       
    )
  }
            
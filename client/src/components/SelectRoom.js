import React from 'react';
import { Form } from 'react-bootstrap';

import { useRoomState } from '../context/rooms';
import Select from 'react-select';

export default function SelectRoom(props) {

    const { rooms } = useRoomState();

    let roomsMarkup;
    let roomData;
    const filterRoomsEmpty = rooms.filter((room) => {
        return room.availability.length > 0
    })
    if (!filterRoomsEmpty) {
        roomsMarkup = "Loading rooms..."
    } else if (filterRoomsEmpty.length === 0) {
        roomsMarkup = "No rooms available"
    } else if (filterRoomsEmpty.length > 0) {

        roomsMarkup =
        <Form.Control
            as="select"
            // className={props.errors.room_id && 'is-invalid'}
            onChange={(e) =>
                props.handleAvailabilityChange(e.target.value)
            }
            required
        >       
            <option value="">Select a room...</option>
            {filterRoomsEmpty.map((room) => (
                <option key={room.id} value={room.id}>{room.name}</option>
            ))}
        </Form.Control>
    }
    
    if (props.room === {}){
        roomData = "You need to select a room"

    } else if (props.room !== {}){
        let array = props.room.availability || [];
        const options = array.map((item) => {
            return {value: item, label: item}
        })
        roomData =
            < Select  
                isMulti
                onChange={(option) =>
                    props.handleChange(option)
                }
                name="booking_hour"
                options={options}
                className="basic-multi-select"
                classNamePrefix="select"
            />
    }

    return (
        <Form.Group>
            <Form.Label className={props.errors.room_id && 'text-danger'}>
                {props.errors.room_id ?? 'Which room ?'}
            </Form.Label>
            {roomsMarkup}
            <Form.Group>
                <Form.Label className={props.errors.booking_hour && 'text-danger'}>
                    {props.errors.date ?? 'Select hours'}
                </Form.Label>
                {roomData}
            </Form.Group>
        </Form.Group>
    )
  }
            
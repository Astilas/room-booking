import React, { useState } from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import { gql, useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import SelectRoom from './SelectRoom';
import checkTodayDate from '../functions/checkTodayDate';
import { useAuthState } from '../context/auth';
import { useRoomState, useRoomDispatch } from '../context/rooms';

const CREATE_EVENT = gql`
  mutation createEvent(
      $title: String!
      $description: String!
      $date: String!
      $booking_hour: [String]!
      $begin_hour: String!
      $end_hour: String!
      $room_id: ID!
      $user_id: ID!
    ) {
      createEvent(
        title: $title 
        description: $description 
        date: $date
        booking_hour: $booking_hour
        begin_hour: $begin_hour
        end_hour: $end_hour
        room_id: $room_id
        user_id: $user_id
      ) {
        title
        description
        date
        booking_hour
        begin_hour
        end_hour
        room_id {
            id
        }
        user_id {
            id
        }
      }
    }
`;

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

export default function CreateEvent({ closeModal }) {
    const { user } = useAuthState();
    const { rooms } = useRoomState()
    const todayDate = checkTodayDate();

    const [variables, setVariables] = useState({
        id: '',
        title: '',
        description: '',
        date: '',
        begin_hour: '',
        booking_hour: [],
        end_hour: '',
        room_id: '',
        user_id: user.id,
        availability: [],
    })

    const [roomValues, setRoomValues] = useState({
        room: {},
    });

    const roomDispatch = useRoomDispatch();
    const [errors, setErrors] = useState({});
    let navigate = useNavigate();

    const [updateRoom, { loading_rooms }] = useMutation(UPDATE_ROOM, {
        // onError: (error) => setErrors(error && error.graphQLErrors[0] ? error.graphQLErrors[0].extensions.errors : {}),
    });

    const [createEvent, { loading }] = useMutation(CREATE_EVENT, {
        onError: (error) => setErrors(error && error.graphQLErrors[0] ? error.graphQLErrors[0].extensions.errors : {}),
    });

    const handleAvailabilityChange = (roomId) => {
        const selectRoomDatas = rooms.find((room) => room.id === roomId);

        setVariables({ ...variables, room_id: roomId, id: roomId })
        setRoomValues({ ...roomValues, room: selectRoomDatas })
    }

    const { booking_hour } = variables;
    const { room } = roomValues;

    const handleChange = (optionValue) => {
        //Delete item select
        let difference = booking_hour.filter(x => !optionValue.includes(x));

        const selectHour = optionValue.map((item) => {
            return item.value;
        });

        const coupleHour = room.availability;

        const filter_array = coupleHour.filter((item) => {
            return selectHour.indexOf(item) < 0;
        });

        setVariables({ ...variables, booking_hour: selectHour, availability: filter_array })
    }

    const submitEventForm = async (e) => {
        e.preventDefault();
       
        await updateRoom({ variables });
        await createEvent({ variables });
        closeModal();
    }

    return (
        <div className="modal">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Add Event</h5>
                        <button type="button" className="close" onClick={closeModal}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <Container>
                            <Row className="bg-white py-5 justify-content-center">

                                <h1 className="center">Create an event</h1>
                                <Form onSubmit={submitEventForm}>
                                    <Form.Group>
                                        <Form.Label className={errors.title && 'text-danger'}>
                                            {errors.title ?? 'Title'}
                                        </Form.Label>
                                        <Form.Control
                                            type="text"
                                            value={variables.title}
                                            className={errors.title && 'is-invalid'}
                                            onChange={(e) =>
                                                setVariables({ ...variables, title: e.target.value })
                                            }
                                            required
                                        />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label className={errors.description && 'text-danger'}>
                                            {errors.description ?? 'Description'}
                                        </Form.Label>
                                        <Form.Control
                                            type="text-area"
                                            value={variables.description}
                                            className={errors.description && 'is-invalid'}
                                            onChange={(e) =>
                                                setVariables({ ...variables, description: e.target.value })
                                            }
                                            required
                                        />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label className={errors.date && 'text-danger'}>
                                            {errors.date ?? 'Date'}
                                        </Form.Label>
                                        <Form.Control
                                            type="date"
                                            value={variables.date}
                                            className={errors.date && 'is-invalid'}
                                            onChange={(e) =>
                                                setVariables({ ...variables, date: e.target.value })
                                            }
                                            min={todayDate}
                                            required
                                        />
                                    </Form.Group>
                                    <Form.Group>
                                        <SelectRoom
                                            errors={errors}
                                            handleAvailabilityChange={handleAvailabilityChange}
                                            handleChange={handleChange}
                                            room={roomValues.room}
                                        />
                                    </Form.Group>
                                    <div className="center mt-3">
                                        <Button variant="success" type="submit" disabled={loading}>
                                            {loading ? 'loading..' : 'Create'}
                                        </Button>{' '}
                                    </div>
                                </Form>
                            </Row>
                        </Container>
                    </div>
                </div>
            </div>
        </div >
    )
}

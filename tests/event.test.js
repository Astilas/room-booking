import 'cross-fetch/polyfill';
import ApolloClient, { gql } from 'apollo-boost';
import { client } from './utils';
const { sequelize, User, Event, Room } = require('../models');

let authenticatedClient;

beforeAll(async () => {
    const login = gql`
            mutation {
              login (
                username: "John"
                password: "john"
              ){
                id
                username
                company
                token
              }
            }
            `;
    const authenticatedUser = await client.mutate({
        mutation: login
    });

    // authenticatedClient = clientHeader(authenticatedUser.data.login.token);
    authenticatedClient = new ApolloClient({
        uri: "http://localhost:4000/graphql",
        request: (operation) => {
            if (authenticatedUser.data) {
                operation.setContext({
                    headers: {
                        "Authorization": `Bearer ${authenticatedUser.data.login.token}`
                    }
                })
            }
        }
    });
});

describe('Tests that can be performed on the event and room mutation', () => {
    it('should not allow an unauthenticated user create an event ', async () => {
        const user = await User.findAll({});
        const userId = user[0].dataValues.id;
        const createEvent = gql`
        mutation {
          createEvent (
            title: "Buy Potatoes",
            description: "Cupcakes",
            booking_hour: ["06-07","10-11"],
            begin_hour: "0"
            end_hour: "0",
            date: "22/04/2022",
            room_id: 1,
            user_id: ${userId}
          ){
            id
            title
            description
            booking_hour
            date
            room_id {
                id
            }
          }
        }
        `;
        await expect(client.mutate({
            mutation: createEvent
        })).rejects.toThrowError("Unauthenticated");
    });

    it('should create an event for an authenticated user', async () => {
        const createEvent = gql`
        mutation {
          createEvent (
            title: "Buy Potatoes",
            description: "Cupcakes",
            booking_hour: ["06-07","10-11"],
            begin_hour: "0"
            end_hour: "0",
            date: "22/04/2022",
            room_id: 1,
            user_id: 1
          ){
            id
            title
            description
            booking_hour
            date
            room_id {
                id
            }
          }
        }
        `;
        const event = await authenticatedClient.mutate({
            mutation: createEvent
        });

        const eventId = parseInt(event.data.createEvent.id)
        const exists = await Event.findOne({ where: { id: eventId } })
            .then(token => token !== null)
            .then(isUnique => isUnique);
        expect(exists).toBe(true);
    });

    it('should delete an event', async () => {
        const eventToDelete = await Event.findAll();
        const eventId = eventToDelete[0].dataValues.id
        const variables = {
            id: eventId
        }
        const deleteEvent = gql`
      mutation deleteEvent ($id: ID!){
        deleteEvent (id: $id)
      }
      `;
        const deletedEvent = await authenticatedClient.mutate({
            mutation: deleteEvent, variables
        });
        const exists = await Event.findOne({ where: { id: eventId } })
            .then(token => token !== null)
            .then(isUnique => isUnique);
        expect(exists).toBe(false);
    });

    it('should update room', async () => {
      const roomToUpdate = await Room.findOne({ where: {name: "roomTest"}});
      const roomId = roomToUpdate.dataValues.id
      const variables = {
          id: roomId,
          availability: ["15-16"]
      }
      const updateRoom = gql`
      mutation updateRoom (
        $id: ID!
        $availability: [String]!
      ){
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
      const updatedRoom = await authenticatedClient.mutate({
          mutation: updateRoom, variables
      });
      const updated = updatedRoom.data.updateRoom.availability
      expect(updated).toEqual(["15-16"]);
  });

});
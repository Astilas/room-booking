const { gql } = require('apollo-server-express');

module.exports = gql`
  type User {
    id: ID!
    username: String!
    email: String
    createdAt: String!
    token: String
  }
  type Room {
    id: ID!
    name: String!
    availability: [String]!
  }
  type Event {
    id: ID!
    title: String!
    description: String!
    date: String!
    booking_hour: [String]!
    begin_hour: String!
    end_hour: String!
    createdAt: String!
    room_id: Room!
    user_id: User!
  }
  type Query {
    getUsers: [User]!
    getRooms: [Room]!
    getEvents: [Event]!
    getEventById(id: ID!): Event!
  }
  type Mutation {
    login(username: String!, password: String!): User!
    register(
      username: String!
      email: String!
      password: String!
      confirmPassword: String!
    ): User!
    createEvent(
      title: String!
      description: String!
      date: String!
      booking_hour: [String]!
      begin_hour: String!
      end_hour: String!
      room_id: ID!
      user_id: ID!
    ): Event!
    updateEvent(
      id: ID!
      title: String!
      description: String!
      date: String!
      booking_hour: [String]!
      begin_hour: String!
      end_hour: String!
      room_id: ID!
      ): [Event]!
    updateRoom(
      id: ID!
      availability: [String]!
      ): Room!
    deleteEvent(id: ID!): Boolean
  }
  type Subscription {
    newEvent: Event!
    removeEvent: EventSubscription!
    changeRoomAvailability: Room!
  }
  type EventSubscription {
      mutation: String!
      event: Event!
  }
`
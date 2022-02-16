const { gql } = require('apollo-server-express')

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
    availability: Boolean!
  }
  type Event {
    id: ID!
    title: String!
    description: String!
    date: String!
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
    login(username: String!, password: String!): User!
  }
  type Mutation {
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
      begin_hour: String!
      end_hour: String!
    ): Event!
    updateEvent(
      id: ID!
      title: String!
      description: String!
      date: String!
      begin_hour: String!
      end_hour: String!
      ): [Event]!
  }
`
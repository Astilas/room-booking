const { gql } = require('apollo-server-express')

module.exports = gql`
  type User {
    username: String!
    email: String
    createdAt: String!
  }
  type Room {
    uuid: String!
    name: String!
    availability: Boolean!
  }
  type Event {
    uuid: String!
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
  }
`
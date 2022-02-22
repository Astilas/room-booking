const userResolvers = require('./users');
const roomResolvers = require('./rooms');
const eventResolvers = require('./events');
const { User, Room } = require('../../models');

module.exports = {
  Event: {
    createdAt: (parent) => parent.createdAt.toISOString(),
    room_id: async (parent) => await Room.findByPk(parent.room_id),
    user_id: async (parent) => await User.findByPk(parent.user_id),
  },
  Query: {
    ...userResolvers.Query,
    ...roomResolvers.Query,
    ...eventResolvers.Query,
  },
  Mutation: {
    ...userResolvers.Mutation,
    ...roomResolvers.Mutation,
    ...eventResolvers.Mutation,
  },
  Subscription: {
    ...eventResolvers.Subscription,
    ...roomResolvers.Subscription,
  }
}

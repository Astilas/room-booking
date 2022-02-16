const userResolvers = require('./users')
const roomResolvers = require('./rooms')
const eventResolvers = require('./events')

module.exports = {
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
}

const bcrypt = require('bcryptjs')
const { UserInputError } = require('apollo-server-express')

const { User, Room, Event } = require('../models')

module.exports = {
  Query: {
    getUsers: async () => {
      try {
        const users = await User.findAll()

        return users
      } catch (err) {
        console.log(err)
      }
    },
    getRooms: async () => {
        try {
          const rooms = await Room.findAll()
  
          return rooms
        } catch (err) {
          console.log(err)
        }
      },
    getEvents: async () => {
      try {
        const events = await Event.findAll()

        return events
      } catch (err) {
        console.log(err)
      }
    },
  },
  Mutation: {
    register: async (_, args) => {
      let { username, email, password, confirmPassword } = args
      let errors = {}

      try {
        // Validate input data
        if (email.trim() === '') errors.email = 'email must not be empty'
        if (username.trim() === '')
          errors.username = 'username must not be empty'
        if (password.trim() === '')
          errors.password = 'password must not be empty'
        if (confirmPassword.trim() === '')
          errors.confirmPassword = 'repeat password must not be empty'

        if (password !== confirmPassword)
          errors.confirmPassword = 'passwords must match'

        if (Object.keys(errors).length > 0) {
          throw errors
        }

        // Hash password
        password = await bcrypt.hash(password, 6)

        // Create user
        const user = await User.create({
          username,
          email,
          password,
        })

        // Return user
        return user

      } catch (err) {
        console.log(err)
        const field = err.parent.constraint.split('_')[1]
        if (err.name === 'SequelizeUniqueConstraintError') {
            errors[field] = `${field} is already taken`
        } else if (err.name === 'SequelizeValidationError') {
            err.errors.forEach((e) => (errors[e.path] = e.message))
          }
        throw new UserInputError('Bad input', { errors })
      }
    },
  },
}

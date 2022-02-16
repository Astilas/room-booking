const bcrypt = require('bcryptjs')
const { UserInputError, AuthenticationError } = require('apollo-server-express')
const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../config/env.json')
const { Op } = require('sequelize')
const { User, Room, Event } = require('../models')

module.exports = {
  Query: {
    getUsers: async (_, __, context) => {
        try {
            let user
            if (context.req && context.req.headers.authorization) {
              const token = context.req.headers.authorization.split('Bearer ')[1]
              jwt.verify(token, JWT_SECRET, (err, decodedToken) => {
                if (err) {
                  throw new AuthenticationError('Unauthenticated')
                }
                user = decodedToken

              })
            }

            const users = await User.findAll({
                where: { username: { [Op.ne]: user.username } },
              })
    
            return users
      } catch (err) {
        throw err;
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
    login: async (_, args) => {
        const { username, password } = args
        let errors = {}
  
        try {
          if (username.trim() === '')
            errors.username = 'username must not be empty'
          if (password === '') errors.password = 'password must not be empty'
  
          if (Object.keys(errors).length > 0) {
            throw new UserInputError('bad input', { errors })
          }
  
          const user = await User.findOne({
            where: { username },
          })
  
          if (!user) {
            errors.username = 'user not found'
            throw new UserInputError('user not found', { errors })
          }
  
          const correctPassword = await bcrypt.compare(password, user.password)
  
          if (!correctPassword) {
            errors.password = 'password is incorrect'
            throw new UserInputError('password is incorrect', { errors })
          }
  
          const token = jwt.sign({ username }, JWT_SECRET, {
            expiresIn: 60 * 60,
          })
  
          return {
            ...user.toJSON(),
            createdAt: user.createdAt.toISOString(),
            token,
          }
        } catch (err) {
          console.log(err)
          throw err
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
        if (err.name === 'SequelizeUniqueConstraintError') {
            const field = err.parent.constraint.split('_')[1]
            errors[field] = `${field} is already taken`
        } else if (err.name === 'SequelizeValidationError') {
            err.errors.forEach((e) => (errors[e.path] = e.message))
        }
        throw new UserInputError('Bad input', { errors })
      }
    },
  },
}

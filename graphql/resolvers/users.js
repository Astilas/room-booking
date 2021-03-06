const bcrypt = require('bcryptjs')
const { UserInputError, AuthenticationError } = require('apollo-server-express')
const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../../config/env.json')
const { Op } = require('sequelize')
const { User } = require('../../models')

module.exports = {
  Query: {
    getUsers: async (_, __, { user }) => {
        try {
          if (!user) throw new AuthenticationError('Unauthenticated');
  
          const users = await User.findAll({
            where: { username: { [Op.ne]: user.username } },
          })
          return users;
        } catch (err) {
            console.log(err);
            throw err;
        }
      },
  },

  Mutation: {
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
          const { id, email, company } = user;
          const token = jwt.sign({ id, email, username, company }, JWT_SECRET, {
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
    register: async (_, args) => {
      let { username, email, password, confirmPassword, company } = args
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

        if (company === null)
          errors.company = 'company must be selected'

        if (Object.keys(errors).length > 0) {
          throw errors
        }

        // Hash password
        password = await bcrypt.hash(password, 6)

        // Create user
        const user = await User.create({
          username,
          email,
          company,
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

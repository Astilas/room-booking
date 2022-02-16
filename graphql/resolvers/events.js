const { UserInputError, AuthenticationError } = require('apollo-server-express');
const { Event } = require('../../models')

module.exports = {
    Query: {
        getEvents: async (_, __, { user }) => {
            try {
                if (!user) throw new AuthenticationError('Unauthenticated');

                const events = await Event.findAll();
        
                return events;
            } catch (err) {
                console.log(err);
                throw err;
            }
        },
    },
    Mutation: {
        createEvent: async (_, args, { user }) => {
          let { title, description, date, begin_hour, end_hour, room_id } = args
          let errors = {}
    
          try {
            console.log(user);
            if (!user) throw new AuthenticationError('Unauthenticated');

            // Validate input data
            if (title.trim() === '') errors.email = 'title must not be empty'
            if (description.trim() === '')
              errors.description = 'description must not be empty'
            if (date === null)
              errors.date = 'you must enter a date'
            if (begin_hour === null)
              errors.begin_hour = 'you must enter a begin hour'
            if (end_hour === null)
              errors.end_hour = 'you must enter a end hour'
    
            if (room_id === null)
              errors.room_id = 'you must choose a room'
    
            if (Object.keys(errors).length > 0) {
              throw errors
            }
    
            // Create event
            const event = await Event.create({
              title,
              description,
              date,
              begin_hour,
              end_hour,
              room_id,
              user_id: 1,
            })
    
            // Return event
            return event
    
          } catch (err) {
            console.log(err)
            // if (err.name === 'SequelizeValidationError') {
            //     err.errors.forEach((e) => (errors[e.path] = e.message))
            // }
            // throw new UserInputError('Bad input', { errors })
            throw err;
          }
        },
        updateEvent: async (_, args, { user }) => {
            let { id, title, description, date, begin_hour, end_hour, room_id } = args
            let errors = {}
      
            try {
              if (!user) throw new AuthenticationError('Unauthenticated');

              // Validate input data
              if (title.trim() === '') errors.email = 'title must not be empty'
              if (description.trim() === '')
                errors.description = 'description must not be empty'
              if (date === null)
                errors.date = 'you must enter a date'
              if (begin_hour === null)
                errors.begin_hour = 'you must enter a begin hour'
              if (end_hour === null)
                errors.end_hour = 'you must enter a end hour'
      
              if (room_id === null)
                errors.room_id = 'you must choose a room'
      
              if (Object.keys(errors).length > 0) {
                throw errors;
              }
              
              const event = await Event.findAll( { where: { id: id }});

              if (!event) throw new UserInputError(`Couldn’t find event with id ${id}`);

              // Update event
              await Event.update({
                id,
                title,
                description,
                date,
                begin_hour,
                end_hour,
                room_id,
                user_id: 1,
              }, { where :{ id: id} })
      
              // Return event
              return event
      
            } catch (err) {
              console.log(err)
              // if (err.name === 'SequelizeValidationError') {
              //     err.errors.forEach((e) => (errors[e.path] = e.message))
              // }
            //   throw new UserInputError('Bad input', { errors })
              throw err;
            }
          },
    },
}
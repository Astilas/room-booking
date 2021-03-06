const { UserInputError, AuthenticationError } = require('apollo-server-express');
const { withFilter } = require('graphql-subscriptions');
const { Event } = require('../../models');


module.exports = {
    Query: {
        getEvents: async (_, args, { user }) => {
          const { user_id } = args;
            try {
                if (!user) throw new AuthenticationError('Unauthenticated');

                const events = await Event.findAll({ where: { user_id: user_id}});

                return events;
            } catch (err) {
                console.log(err);
                throw err;
            }
        },
        getEventById: async (_, args, { user }) => {
          const { id } = args;
          try {
              if (!user) throw new AuthenticationError('Unauthenticated');

              const event = await Event.findOne({ where: { id: id } });
  
              return event;
          } catch (err) {
              console.log(err);
              throw err;
          }
        },
    },
    Mutation: {
        createEvent: async (_, args, { user, pubsub }) => {
          let { title, description, date, booking_hour, begin_hour, end_hour, room_id, user_id } = args;
          let errors = {};

          try {
            if (!user) throw new AuthenticationError('Unauthenticated');

            // Validate input data
            if (title.trim() === '') errors.title = 'title must not be empty'
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
              booking_hour,
              begin_hour,
              end_hour,
              room_id,
              user_id,
            })
    
            // Publish event
            pubsub.publish('NEW_EVENT', { newEvent: event });

            // Return event
            return event;
    
          } catch (err) {
            console.log(err)
            if (err.name === 'SequelizeValidationError') {
                err.errors.forEach((e) => (errors[e.path] = e.message))
            }
            if (!user) {
              throw new AuthenticationError('Unauthenticated');
            } else {
              throw new UserInputError('Bad input', { errors })
            }
            // throw err;
          }
        },
        updateEvent: async (_, args, { user }) => {
            let { id, title, description, date, booking_hour, begin_hour, end_hour, room_id } = args;
            let errors = {};
      
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
              
              const event = await Event.findOne( { where: { id: id }});

              if (!event) throw new UserInputError(`Couldn???t find event with id ${id}`);

              // Update event
              await Event.update({
                id,
                title,
                description,
                date,
                booking_hour,
                begin_hour,
                end_hour,
                room_id,
                user_id: 1,
              }, { where :{ id: id} })
      
              // Return event
              return event;
      
            } catch (err) {
              console.log(err)
              // if (err.name === 'SequelizeValidationError') {
              //     err.errors.forEach((e) => (errors[e.path] = e.message))
              // }
            //   throw new UserInputError('Bad input', { errors })
              throw err;
            }
          },
          deleteEvent: async (_, args, { user, pubsub }) => {
            const { id } = args;

            try {
              if (!user) throw new AuthenticationError('Unauthenticated');

              const event = await Event.findOne( { where: { id: id }});
              // Delete event ==> BOOL
              const eventRemoved = await Event.destroy({ where: { id: id }});

              await pubsub.publish('REMOVE_EVENT', { removeEvent: {
                mutation: "Deleted",
                event: event
              } });

              return eventRemoved;
      
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
    Subscription: {
      newEvent: {
        subscribe: withFilter(
          (_, __, { pubsub, user }) => {
              if (!user) throw new AuthenticationError('Unauthenticated');
              return pubsub.asyncIterator(['NEW_EVENT'])
          },
          ( { newEvent }, variables ) => {
              // Only push an update if the comment is on
              // the correct repository for this operation
              if (newEvent) return true
              return false
            },
        )
      },
      removeEvent: {
        subscribe:  withFilter(
          (_, __, { pubsub, user }) => {
            if (!user) throw new AuthenticationError('Unauthenticated')
              return pubsub.asyncIterator(['REMOVE_EVENT'])
        },
        ( { removeEvent }, variables ) => {
          // Only push an update if the comment is on
          // the correct repository for this operation
          if (removeEvent) return true
          return false
        },
      )
      },
    }
}
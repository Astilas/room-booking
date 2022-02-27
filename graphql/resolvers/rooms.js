const { AuthenticationError } = require('apollo-server-express');
const { Room } = require('../../models');
const { Op, Sequelize } = require('sequelize');
const { withFilter } = require('graphql-subscriptions');

module.exports = {
    Query: {
        getRooms: async (_, __, { user }) => {
            try {
                if (!user) throw new AuthenticationError('Unauthenticated');

                const rooms = await Room.findAll({
                    // where: Sequelize.where(
                    //     Sequelize.fn('array_length', Sequelize.col('availability'), 1),
                    //     { [Op.gt]: 0 },
                    // )
                });
        
                return rooms;
            } catch (err) {
                console.log(err);
                throw err;
            }
          },
    },
    Mutation: {
        updateRoom: async (_, args, { pubsub, user }) => {
            let { id, availability } = args;
            try {
                if (!user) throw new AuthenticationError('Unauthenticated');
                const room = await Room.findOne( { where: { id: id }});

                if (!room) throw new UserInputError(`Couldn’t find room with id ${id}`);

                await Room.update({
                    id,
                    availability
                  }, { where :{ id: id} });

                const updatedRoom = await Room.findOne( { where: { id: id }});
                pubsub.publish('CHANGE_ROOM_AVAILABILITY', { changeRoomAvailability: updatedRoom });

                  // Return room
                return room;


            } catch (err) {
                console.log(err);
                throw err;
            }
        }
    },
    Subscription: {
        changeRoomAvailability: {
          subscribe: withFilter(
            (_, __, { pubsub, user }) => {
                if (!user) throw new AuthenticationError('Unauthenticated')
                return pubsub.asyncIterator(['CHANGE_ROOM_AVAILABILITY'])
            },
            ( { changeRoomAvailability }, variables )=> {
                // Only push an update if the comment is on
                // the correct repository for this operation
                if (changeRoomAvailability) return true
                return false
              },
          )
        },
    }
}
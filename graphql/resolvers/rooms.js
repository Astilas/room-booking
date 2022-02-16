const { AuthenticationError } = require('apollo-server-express');
const { Room } = require('../../models')

module.exports = {
    Query: {
        getRooms: async (_, __, { user }) => {
            try {
                if (!user) throw new AuthenticationError('Unauthenticated');

                const rooms = await Room.findAll({
                    where: { availability: true }
                });
        
                return rooms;
            } catch (err) {
                console.log(err);
                throw err;
            }
          },
    }
}
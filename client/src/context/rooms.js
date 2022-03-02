import React, { createContext, useReducer, useContext } from 'react';

const RoomStateContext = createContext();
const RoomDispatchContext = createContext();

const roomReducer = (state, action) => {
  const { room } = action.payload;
  switch (action.type) {
    case 'GET_ROOMS':
        return {
          ...state,
          rooms: action.payload,
        }
    case 'UPDATE_ROOM':
      const roomsCopy = [...state.rooms];
      const id = room.id;

      const selectRoomDatas = roomsCopy.find((room) => room.id === id);

      // Return all rooms without the rooms were the events got deleted
      const newRooms = roomsCopy.filter((room) => {
        return room !== selectRoomDatas;
      });
      // Sort rooms
      const roomsUpdate = [...newRooms, room]
      const sortRoom = roomsUpdate.sort((a,b) =>  a.id - b.id);
      // Then add the upadted room (with the new available hour) in rooms state
      return {
        ...state,
        rooms: sortRoom,
      };
    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
}

export const RoomProvider = ({ children }) => {
  const [state, dispatch] = useReducer(roomReducer, { rooms: null });

  return (
    <RoomDispatchContext.Provider value={dispatch}>
      <RoomStateContext.Provider value={state}>
        {children}
      </RoomStateContext.Provider>
    </RoomDispatchContext.Provider>
  )
}

export const useRoomState = () => useContext(RoomStateContext)
export const useRoomDispatch = () => useContext(RoomDispatchContext)
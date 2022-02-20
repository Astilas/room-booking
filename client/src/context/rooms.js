import React, { createContext, useReducer, useContext } from 'react';

const RoomStateContext = createContext();
const RoomDispatchContext = createContext();

const roomReducer = (state, action) => {
  switch (action.type) {
    case 'GET_ROOMS':
        return {
          ...state,
          rooms: action.payload,
        }
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
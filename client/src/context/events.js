import React, { createContext, useReducer, useContext } from 'react'

const EventStateContext = createContext()
const EventDispatchContext = createContext()

const eventReducer = (state, action) => {
  switch (action.type) {
    case 'GET_EVENTS':
        return {
          ...state,
          events: action.payload,
        }
    default:
      throw new Error(`Unknown action type: ${action.type}`)
  }
}

export const EventProvider = ({ children }) => {
  const [state, dispatch] = useReducer(eventReducer, { events: null })

  return (
    <EventDispatchContext.Provider value={dispatch}>
      <EventStateContext.Provider value={state}>
        {children}
      </EventStateContext.Provider>
    </EventDispatchContext.Provider>
  )
}

export const useEventState = () => useContext(EventStateContext)
export const useEventDispatch = () => useContext(EventDispatchContext)
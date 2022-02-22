import React, { createContext, useReducer, useContext } from 'react'

const EventStateContext = createContext()
const EventDispatchContext = createContext()

const eventReducer = (state, action) => {
  let eventsCopy;
  const { event } = action.payload
  switch (action.type) {
    case 'GET_EVENTS':
        return {
          ...state,
          events: action.payload,
        }
    case 'ADD_EVENT':
      eventsCopy = [...state.events]
        return {
          ...state,
          events: [...eventsCopy, event]
        }
    case 'DELETE_EVENT':
      eventsCopy = [...state.events]
      // Remove event by filter id on the event list
      const newEventList = eventsCopy
            .filter((e) => e.id !== event.id);

        return {
          ...state,
          events: newEventList,
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
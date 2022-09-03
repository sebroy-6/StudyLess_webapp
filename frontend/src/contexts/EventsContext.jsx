import { createContext, useReducer } from "react";

export const EventContext = createContext();

function reduceEvents(state, action) {
    switch (action.type) {
        case "SET_EVENTS_IN_DAY":
            return { events: [...state.daysEvents, { [action.payload.date]: action.payload.daysEvents }] };
        case "ADD_EVENT_TO_DAY":
            state.events.find((day) => action.payload.date === day.date).daysEvents.push(action.payload.event)
            return state;
        /*
        case "REMOVE_EVENT_FROM_DAY":
            state.events.find((day) => {
                action.payload.date === day.date
            }).daysEvents.find((event) => {
                event._id === action.payload._id
            })
        */
        default:
            return state;
    }
}

export const EventContextProvider = (props) => {
    const [state, dispatch] = useReducer(reduceEvents, {
        events: []
    });

    return (
        <EventContext.Provider value={{ ...state, dispatch }}>
            {props.children}
        </EventContext.Provider>
    );
};
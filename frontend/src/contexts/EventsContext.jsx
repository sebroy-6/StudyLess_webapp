import { createContext, useReducer } from "react";

export const EventsContext = createContext();

function reduceEvents(state, action) {
    const date = action.payload.date;
    switch (action.type) {
        case "SET_EVENTS_BY_DAY":
            const daysEvents = action.payload.daysEvents;
            return { events: [...state.events, { date, daysEvents }] };
        default:
            return state;
    }
}

export const EventContextProvider = (props) => {
    const [state, dispatch] = useReducer(reduceEvents, {
        events: []
    });

    return (
        <EventsContext.Provider value={{ ...state, dispatch }}>
            {props.children}
        </EventsContext.Provider>
    );
};
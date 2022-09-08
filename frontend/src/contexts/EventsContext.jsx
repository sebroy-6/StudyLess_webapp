import { createContext, useReducer } from "react";

export const EventsContext = createContext();

function reduceEvents(state, action) {
    const date = action.payload.date;
    switch (action.type) {
        case "SET_EVENTS_BY_DAY":
            const daysEvents = action.payload.daysEvents;
            return { events: [...state.events, { date, daysEvents }] };

        case "ADD_EVENT_BY_DAY":
            /*
            console.log("before: ", state);
            let initDaysEvents = state.events.find((eventsByDate) => {
                return eventsByDate.date === action.payload.date;
            }).daysEvents;

            if (initDaysEvents) {
                state.events.find((eventsByDate) => {
                    return eventsByDate.date === action.payload.date;
                }).daysEvents.push(action.payload.event);
            }
            console.log("after: ", state);
            */
            return state;

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
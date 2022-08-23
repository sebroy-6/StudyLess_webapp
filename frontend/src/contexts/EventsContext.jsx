import { createContext, useReducer } from "react";

export const EventContext = createContext();

function reduceEvents(state, action) {
    switch (action.type) {
        case "SET_EVENTS":
            return { events: action.payload };
        case "ADD_EVENT":
            return { events: [action.payload, ...state.tasks] };
        case "REMOVE_EVENT":
            return { events: state.tasks.filter((task) => task._id !== action.payload._id) };
        default:
            return state;
    }
}

export const EventContextProvider = (props) => {
    const [state, dispatch] = useReducer(reduceEvents, {
        events: null
    });

    return (
        <EventContext.Provider value={{ ...state, dispatch }}>
            {props.children}
        </EventContext.Provider>
    );
};
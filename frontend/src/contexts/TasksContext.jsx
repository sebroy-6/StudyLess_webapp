import { createContext, useReducer } from "react";

export const TasksContext = createContext();

function reduceTasks(state, action) {
    switch (action.type) {
        case "SET_TASKS":
            return { tasks: action.payload };
        case "ADD_TASK":
            return { tasks: [action.payload, ...state.tasks] };
        case "REMOVE_TASK":
            return { tasks: state.tasks.filter((task) => task._id !== action.payload._id) };
        default:
            return state;
    }
}

export const TaskContextProvider = (props) => {
    const [state, dispatch] = useReducer(reduceTasks, {
        tasks: null
    });

    return (
        <TasksContext.Provider value={{ ...state, dispatch }}>
            {props.children}
        </TasksContext.Provider>
    );
};
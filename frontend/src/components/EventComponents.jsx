import React from "react";
import { CollapsibleDivider } from "./ClickableComponents";
import { useDrag } from "react-dnd";
import "./css/EventComponents.css";

const AddEventTag = ({ event }) => {
    const [{ isDragging }, dragRef] = useDrag({ // eslint-disable-line
        type: "event",
        item: event,
        collect: (monitor) => {
            return { isDragging: monitor.isDragging() };
        }
    })

    return (
        <button className="addEventTag" draggable>
        </button>
    );
}

export const ScheduleEvents = () => {
    return (
        <div className="eventsContainer">
            <h2>Event tags</h2>
            <CollapsibleDivider title="Events">
                <AddEventTag type="transport" />
                <AddEventTag type="class" title="LOG1410" />
                <AddEventTag type="class" title="INF1015" />
                <AddEventTag type="class" title="INF1900" />
            </CollapsibleDivider>
        </div>
    );
}
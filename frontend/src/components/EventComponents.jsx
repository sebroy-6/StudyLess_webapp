import React from "react";
import { CollapsibleDivider } from "./ClickableComponents";
import "./css/EventComponents.css";

const AddEventTag = ({ type, title, style }) => {
    return (
        <button className="addEventTag" style={style ? style : undefined} draggable>
            {title ? `${type} - ${title}` : type}
        </button>
    );
}

const EventTagsList = ({ title, events }) => {
    return (
        <div>
            {
                events && events?.length ?
                    events.map((event) => {

                    }) : null
            }

        </div >
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
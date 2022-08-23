import React, { useEffect } from "react";
import { GridContainer } from "./GridContainerComponent";
import "./css/ScheduleComponents.css";

const timeStamps = [
    "4 AM", "5 AM", "6 AM", "7 AM", "8 AM",
    "9 AM", "10 AM", "11 AM", "12 PM", "1 PM",
    "2 PM", "3 PM", "4 PM", "5 PM", "6 PM",
    "7 PM", "8 PM", "9 PM",
];

const events = [
    { title: "basketball", startTime: "2022-08-17T00:00:00.000+00:00", id: 134908 },
];

const EventTag = ({ id, height, title }) => {

    return (
        <div
            className="eventTag"
            id={id}
            style={{
                backgroundColor: "var(--thirnaryColor)",
            }}
            draggable="true"
        >{title}</div>
    );
}

const TimeStamp = () => {
    return (
        <GridContainer nbRows={timeStamps.length} nbColumns={1} _id="timeStamps">
            {timeStamps.map((timeStamp) => {
                return (
                    <div id={timeStamp} className="timeStamp" style={{
                        backgroundColor: "lightgrey",
                    }}>
                        {timeStamp}
                    </div>
                );
            })}
        </GridContainer>
    )
}

const DaySchedule = ({ _id, date, events }) => {

    return (
        <GridContainer nbRows={timeStamps.length * 4} nbColumns={1} _id={_id}>
            {events && events.map((event) => {
                return (
                    <EventTag id={event.id} height={event.time / 15} title={event.title} />
                );
            })}
        </GridContainer>
    );
}

export const WeekSchedule = () => {
    useEffect(() => {
        let dragged = null;

        document.addEventListener("dragstart", (event) => {
            // store a ref. on the dragged elem
            dragged = event.target;
        });

        document.addEventListener("dragover", (event) => {
            // prevent default to allow drop
            event.preventDefault();
        });

        document.addEventListener("drop", (event) => {
            // prevent default action (open as link for some elements)
            event.preventDefault();
            // move dragged element to the selected drop target
            if (event.target.className === "gridContainer") {
                dragged.parentNode.removeChild(dragged);
                event.target.appendChild(dragged);
            }
        });
    }, []);  //eslint-disable-line react-hooks/exhaustive-deps

    return (
        <GridContainer nbRows={20} nbColumns={23} _id="scheduleGrid">
            <div className="scheduleElement" width={2} id="emptySquare"></div>
            <div className="scheduleElement" width={3} id="mondayHeader">monday</div>
            <div className="scheduleElement" width={3} id="tuesdayHeader">tuesday</div>
            <div className="scheduleElement" width={3} id="wednesdayHeader">wednesday</div>
            <div className="scheduleElement" width={3} id="thursdayHeader">thursday</div>
            <div className="scheduleElement" width={3} id="fridayHeader">friday</div>
            <div className="scheduleElement" width={3} id="saturdayHeader">saturday</div>
            <div className="scheduleElement" width={3} id="sundayHeader">sunday</div>
            <div className="scheduleElement" id="timeStampsContainer" width={2} height={19}>
                <TimeStamp />
            </div>
            <div className="scheduleDay" id="mondayContainer" width={3} height={19}>
                <DaySchedule date="monday" _id="mondaySchedule" events={events} />
            </div>
            <div className="scheduleDay" id="tuesdayContainer" width={3} height={19}>
                <DaySchedule date="tuesday" _id="tuesdaySchedule" />
            </div>
            <div className="scheduleDay" id="wednesdayContainer" width={3} height={19}>
                <DaySchedule date="wednesday" _id="wednesdaySchedule" />
            </div>
            <div className="scheduleDay" id="thursdayContainer" width={3} height={19}>
                <DaySchedule date="thursday" _id="thursdaySchedule" />
            </div>
            <div className="scheduleDay" id="fridayContainer" width={3} height={19}>
                <DaySchedule date="friday" _id="fridaySchedule" />
            </div>
            <div className="scheduleDay" id="saturdayContainer" width={3} height={19}>
                <DaySchedule date="saturday" _id="saturdaySchedule" />
            </div>
            <div className="scheduleDay" id="sundayContainer" width={3} height={19}>
                <DaySchedule date="sunday" _id="sundaySchedule" />
            </div>
        </GridContainer>
    );
}

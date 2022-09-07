import React, { useEffect, useContext } from "react";
import "./css/ScheduleComponents.css";
import { GridContainer } from "./GridContainerComponent";
import { useDrop } from "react-dnd";
import { EventsContext } from "../contexts/EventsContext";
import { getEventsByDay } from "../utils/EventAPIRequest";

function isValidDate(dateString) {
    var dateRegEx = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateString.match(dateRegEx)) return false; // Invalid format
    var d = new Date(dateString);
    var dNum = d.getTime();
    if (!dNum && dNum !== 0) return false; // NaN value, Invalid date
    return d.toISOString().slice(0, 10) === dateString;
}


const ScheduleHeader = ({ children }) => {
    return (
        <div className="scheduleHeader">
            {children}
        </div>
    );
}

export const ScheduleDay = ({ nbRows, _id, date }) => {
    const { events, dispatch } = useContext(EventsContext);
    const [{ isOver }, dropRef] = useDrop({ // eslint-disable-line
        accept: 'event',
        drop: (event) => {
            document.getElementById(`middleground${_id}`).style.zIndex = 1;
        },
        collect: (monitor) => ({
            isOver: monitor.isOver()
        })
    });

    const backgroundIdList = [];
    for (let i = 1; i <= nbRows; i++) { backgroundIdList.push(`${_id}${i}`); }
    const middlegroundIdList = [];
    for (let i = 1; i <= 4 * nbRows; i++) { middlegroundIdList.push(`${_id}${i}`); }

    useEffect(() => {
        if (!isValidDate(date)) {
            throw new Error("invalid date was provided to ScheduleDay component");
        }

        async function getTodaysEvents() {
            let daysEvents = events.find((eventByDate) => { return eventByDate.date === date; })
            if (!daysEvents) {
                daysEvents = await getEventsByDay(dispatch, date);
            }
            return daysEvents;
        }
        getTodaysEvents();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div className="scheduleDay">
            <ScheduleHeader>{`${date}`}</ScheduleHeader>

            <div id={"background" + _id} className="background">
                <GridContainer nbRows={nbRows} nbColumns={6} _id={"background"}>
                    {
                        backgroundIdList.map((id) => {
                            return <div
                                key={id}
                                id={"background" + id}
                                style={{
                                    "border": "1px solid grey",
                                    "borderBottomStyle": "dashed",
                                    "borderTopStyle": "none"
                                }}
                                width={6} />;
                        })
                    }
                </GridContainer>
            </div>

            <div id={"middleground" + _id} className="middleground">
                <GridContainer nbRows={nbRows * 4} nbColumns={6} _id="middleground" >
                    {
                        middlegroundIdList.map((id) => {
                            return <div ref={dropRef} id={"middleground" + id} style={{ backgroundColor: "transparent" }} width={6} />
                        })
                    }
                </GridContainer >
            </div>

            <div id={"foreground" + _id} className="foreground">
                <GridContainer nbRows={nbRows * 4} nbColumns={6} _id={"foreground"} />
            </div>
        </div>
    );
}
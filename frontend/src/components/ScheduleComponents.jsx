import React from "react";
import { GridContainer } from "./GridContainerComponent";
import { useDrop } from "react-dnd";
import "./css/ScheduleComponents.css";

const ScheduleHeader = ({ children }) => {
    return (
        <div className="scheduleHeader">
            {children}
        </div>
    );
}


export const ScheduleDay = ({ nbRows, _id, date }) => {
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

    return (
        <div className="scheduleDay">
            <ScheduleHeader>{date}</ScheduleHeader>

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
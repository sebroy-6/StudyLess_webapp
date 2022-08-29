import React from "react";
import { GridContainer } from "./GridContainerComponent";
import "./css/ScheduleComponents.css";

const ScheduleHeader = ({ children }) => {
    return (
        <div className="scheduleHeader">
            {children}
        </div>
    );
}


export const ScheduleDay = ({ nbRows, _id, date }) => {
    const idList = [];
    for (let i = 1; i <= nbRows; i++) {
        idList.push(`${_id}${i}`);
    }

    return (
        <div className="scheduleDay">
            <ScheduleHeader>{date}</ScheduleHeader>
            <div className="background">
                <GridContainer nbRows={nbRows} nbColumns={6} _id={"background"}>
                    {
                        idList.map((id) => {
                            return <div
                                key={id}
                                id={id}
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
            <div className="foreground">
                <GridContainer nbRows={nbRows * 4} nbColumns={6} _id={"forground"} />
            </div>
        </div>
    );
}
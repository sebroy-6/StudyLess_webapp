import React from "react";
import { FullSideBar, FullTopBar } from "../components/NavBarComponents";
//import { TaskList } from "../components/TasksComponents";
//import { DaySchedule } from "../components/ScheduleComponents";
import { GridContainer } from "../components/GridContainerComponent.jsx";

const SchedulePage = () => {
    return (
        <div>
            <FullSideBar hasAppContainer={true} />
            <FullTopBar />
            <div className="app-container">
                <GridContainer nbRows={8} nbColumns={12}>
                    <div id="0">0</div>
                    <div id="1" >1</div>
                    <div id="2">2</div>
                    <div id="3">3</div>
                    <div id="4" width={8} height={6}>4</div>
                    <div id="5">5</div>
                    <div id="6">6</div>
                    <div id="7">7</div>
                    <div id="8">8</div>
                    <div id="9">9</div>
                    <div id="10">10</div>
                    <div id="11">11</div>
                </GridContainer>
            </div>
        </div>
    );
}

export default SchedulePage;
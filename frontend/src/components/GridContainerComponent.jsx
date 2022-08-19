import React, { useEffect } from "react";
import "./css/GridContainerComponent.css";

export const GridContainer = ({ children, nbRows, nbColumns }) => {
    useEffect(() => {
        if (nbRows)
            document.getElementById("grid").style.gridTemplateRows = `repeat(${nbRows}, 1fr)`;
        if (nbColumns)
            document.getElementById("grid").style.gridTemplateColumns = `repeat(${nbColumns}, 1fr)`;

        children.map((child) => {   //eslint-disable-line
            if (child.props.width)
                document.getElementById(child.props.id).style.gridColumn = `span ${child.props.width}`;
            if (child.props.height)
                document.getElementById(child.props.id).style.gridRow = `span ${child.props.height}`;
        });
    }, [])  //eslint-disable-line react-hooks/exhaustive-deps


    return (
        <div className="gridContainer" id="grid">
            {children}
        </div>
    );
};
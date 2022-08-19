import React, { useEffect } from "react";
import "./css/GridContainerComponent.css";

export const GridContainer = ({ children, nbRows, nbColumns, _id }) => {
    useEffect(() => {
        if (nbRows)
            document.getElementById(_id).style.gridTemplateRows = `repeat(${nbRows}, 1fr)`;
        if (nbColumns)
            document.getElementById(_id).style.gridTemplateColumns = `repeat(${nbColumns}, 1fr)`;

        React.Children.toArray(children).forEach((child) => {
            if (child.props.width)
                document.getElementById(child.props.id).style.gridColumn = `span ${child.props.width}`;
            if (child.props.height)
                document.getElementById(child.props.id).style.gridRow = `span ${child.props.height}`;
        });
    }, [])  //eslint-disable-line react-hooks/exhaustive-deps


    return (
        <div className="gridContainer" id={_id}>
            {children}
        </div>
    );
};
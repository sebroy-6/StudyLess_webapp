import { useState } from "react";


export const useHide = (isHiddenInitState) => {
    const [isHidden, setIsHidden] = useState(isHiddenInitState);
    const toggleIsHidden = () => {
        setIsHidden(isHidden ? "" : "hidden");
    }
    return [isHidden ? "hidden" : "", toggleIsHidden];
}
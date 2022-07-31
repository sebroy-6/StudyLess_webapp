import { useState } from "react";

export const useSwitch = (initialValue, nextValue) => {
    const [value, setValue] = useState(initialValue);
    const toggleValue = () => {
        setValue(value === initialValue ? nextValue : initialValue);
    }
    return [value, toggleValue];
}
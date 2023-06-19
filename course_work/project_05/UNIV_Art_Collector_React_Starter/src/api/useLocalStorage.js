import { useState, useEffect } from "react";

function getStorageValue(key, defaultValue) {
    const saved = localStorage.getItem(key);
    const intial = JSON.parse(saved);
    return intial || defaultValue;
}

export const useLocalStorage = (key, defaultValue) => {
    const [value, setValue]=useState(() => {
        return getStorageValue(key, defaultValue);
    });
    
    useEffect(() => {
        //storing input name
        localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);

    return [value, setValue];
};

//TODO: write function to reset key


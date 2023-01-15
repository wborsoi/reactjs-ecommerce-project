import { useState } from "react";
import Context from './Context';

export default function ContextProvider(props) {
    const { children } = props;
    const [cart, setCart] = useState([]);
    
    return <Context.Provider value={{cart, setCart}}>{children}</Context.Provider>
}
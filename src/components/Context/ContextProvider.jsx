import { useState } from "react";
import Context from './Context';

export default function ContextProvider(props) {
    const { children } = props;
    const [cart, setCart] = useState([]);

    // const value = {
    //     sessionContext: {
    //         userSession: userSession,
    //         setUserSession: setUserSession
    //     },
    //     cartContext: {
    //         cart: cart,
    //         setCart: setCart
    //     }
    // };
    return <Context.Provider value={{cart, setCart}}>{children}</Context.Provider>
}
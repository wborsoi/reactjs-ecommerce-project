import { useState } from "react";
import Context from './Context';
import {getUserSession} from '../../services/loginServices';

export default function ContextProvider(props) {
    const { children } = props;
    const [cart, setCart] = useState([]);
    const [userSession, setUserSession] = useState(getUserSession());
    
    return <Context.Provider value={{cart, setCart, userSession, setUserSession}}>{children}</Context.Provider>
}
import { useState } from "react";
import Context from './Context';
import {getUserSesion} from '../../services/loginServices';

export default function ContextProvider(props) {
    const { children } = props;
    const userSavedSesion = getUserSesion();
    const [cart, setCart] = useState([]);
    const [userSesion, setUserSesion] = useState(userSavedSesion);
    
    return <Context.Provider value={{cart, setCart, userSesion, setUserSesion}}>{children}</Context.Provider>
}
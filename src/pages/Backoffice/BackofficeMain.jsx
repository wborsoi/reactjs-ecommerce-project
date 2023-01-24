import BackofficeNavbar from "../../components/Backoffice/BackofficeNavbar";
import { Routes, Route, Navigate, Outlet } from 'react-router-dom'
import CategoriesBO from "./CategoriesBO";
import ProductsBO from "./ProductsBO";
import Context from "../../components/Context/Context";
import { useContext } from "react";
import './Backoffice.css'

export default function BackofficeMain(props) {
    const { userSession } = useContext(Context);
    
    if(userSession?.isAdmin){
        return (
            <section className="bo-section">
                <BackofficeNavbar />
                <Outlet />
            </section>
        );
    }
    else {
        return <Navigate to="/" />
    }
}
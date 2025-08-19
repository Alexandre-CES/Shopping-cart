import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from '../pages/home/Home';
import ProductView from "../pages/product/Product";
import Register from "../pages/auth/register/Register";
import Login from "../pages/auth/login/Login";
import Private from "./Private";
import Cart from "../pages/cart/Cart";

export default function RoutesApp(){
    return(
        <BrowserRouter>
            <Routes>
                {/* need auth */}
                <Route path="/" element={<Private><Home/></Private>}/>
                <Route path="product/:id" element={<Private><ProductView/></Private>}/>
                <Route path="cart" element={<Private><Cart/></Private>}/>

                {/* Do not neet auth */}
                <Route path="register" element={<Register/>}/>
                <Route path="login" element={<Login/>}/>
            </Routes>
        </BrowserRouter>
    )
}
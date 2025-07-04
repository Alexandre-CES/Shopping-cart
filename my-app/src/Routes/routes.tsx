import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from '../Pages/Home/home';
import ProductView from "../Pages/Product/product";
import Register from "../Pages/Register/register";
import Login from "../Pages/Login/login";
import Private from "./Private";
import Cart from "../Pages/Cart/cart";

export default function RoutesApp(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Private><Home/></Private>}/>
                <Route path="product/:id" element={<Private><ProductView/></Private>}/>
                <Route path="register" element={<Register/>}/>
                <Route path="login" element={<Login/>}/>
                <Route path="cart" element={<Cart/>}/>
            </Routes>
        </BrowserRouter>
    )
}
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from '../pages_tmp/home_tmp/Home';
import ProductView from "../pages_tmp/product_tmp/Product";
import Register from "../pages_tmp/auth_tmp/register/Register";
import Login from "../pages_tmp/auth_tmp/login/Login";
import Private from "./Private";
import Cart from "../pages_tmp/cart_tmp/Cart";

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
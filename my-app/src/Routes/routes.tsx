import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from '../Pages/Home/home';
import ProductView from "../Pages/Product/product";
import Register from "../Pages/Register/register";

export default function RoutesApp(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="product/:id" element={<ProductView/>}/>
                <Route path="register" element={<Register/>}/>
            </Routes>
        </BrowserRouter>
    )
}
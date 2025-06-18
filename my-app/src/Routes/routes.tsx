import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from '../Pages/Home/home';
import Product from "../Pages/Product/product";

export default function RoutesApp(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="product/:id" element={<Product/>}/>
            </Routes>
        </BrowserRouter>
    )
}
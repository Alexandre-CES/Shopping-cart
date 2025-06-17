import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from '../Pages/Home/home';

export default function RoutesApp(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home/>}/>
            </Routes>
        </BrowserRouter>
    )
}
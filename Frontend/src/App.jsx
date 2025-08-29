import {BrowserRouter, Routes,Route} from "react-router-dom"
import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Contact from "./pages/contact";
import Service from "./pages/Service";
import Navbar from "./pages/Navbar";
import Logout from "./pages/logout";
import './App.css'

function App() {
  
  return (
   <>
   
   <BrowserRouter>
   <Navbar/>
   <Routes>
    <Route path="/" element={<Home/>} />
    <Route path="/about" element={<About/>} />
    <Route path="/login" element={<Login/>} />
    <Route path="/register" element={<Register/>} />
    <Route path="/contact" element={<Contact/>} />
    <Route path="/service" element={<Service/>} />
    <Route path="/logout"  element={<Logout/>}/>
   </Routes>
   </BrowserRouter>
   </>
  )
}

export default App

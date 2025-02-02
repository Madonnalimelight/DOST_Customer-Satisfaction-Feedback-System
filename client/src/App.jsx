import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./Components/Navbar";
import Landingpage  from "./pages/Landingpage"
import ServiceForm from "./pages/Serviceslist";
import CustomerProfile from "./pages/CustomerProfile";
import FeedbackEvaluation from "./pages/FeedbackEvaluation";
import  Libraryuser from "./pages/LibraryUserForm"

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Landingpage/>}/>
          <Route path="/Service" element={<ServiceForm/>}/>
          <Route path="/Customerprofile" element={<CustomerProfile/>}/>
          <Route path="/Feedback" element={<FeedbackEvaluation/>}/>
          <Route path="/libraryuser" element={<Libraryuser/>}/>
          
          
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

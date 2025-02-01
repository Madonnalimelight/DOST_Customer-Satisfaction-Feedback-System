import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./Components/Navbar";
import Landingpage from "./pages/Landingpage";
import Home from "./pages/Home";
import CustomerProfile from "./pages/CustomerProfile";
import FeedbackEvaluation from "./pages/FeedbackEvaluation";
import LibraryUserForm from "./pages/LibraryUserForm";
import Services from "./pages/Services";
import AdminDashboard from "./pages/AdminDashboard";
import ServicesList from "./pages/Serviceslist";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Landingpage />} />
          <Route path="/homepage" element={<Home />} />
          <Route path="/customer" element={<CustomerProfile />} />
          <Route path="/libraryuserform" element={<LibraryUserForm />} />
          <Route path="/feedback" element={<FeedbackEvaluation />} />
          <Route path="/services" element={<Services />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/serviceslist" element={<ServicesList />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;



import  TeachersPage  from './views/teacher';
import { Routes, Route } from "react-router-dom";
import "./App.css";

import Login from "./views/login";
import HomePage from "./views/home";
import Student from "./views/student";

import DashboardLayout from "./views/dashboardLayout"; 
import DashboardHome from "./views/dashboardhome"; // Necesitas crear este archivo
import Profile from "./views/profile"; // Necesitas crear este archivo para /dashboard/profile
import EnrollmentsPage from './views/enrollment';
import PaymentsPage from './views/payment';



function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/home" element={<HomePage />} />
      
      <Route path="dashboard" element={<DashboardLayout />}>
        <Route index element={<DashboardHome />} />
        <Route path="profile" element={<Profile />} />
        <Route path="students" element={<Student />} /> 
        <Route path="teachers" element={<TeachersPage />} /> 
        <Route path='enrollment' element={<EnrollmentsPage/>} />
        <Route path='payments' element={<PaymentsPage/>} />
      </Route>
      
    </Routes>
  );
}

export default App;
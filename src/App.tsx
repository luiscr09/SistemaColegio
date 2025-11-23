

import  TeachersPage  from './views/teacher';
import { Routes, Route } from "react-router-dom";
import "./App.css";


import Login from "./views/login";
import HomePage from "./views/home";
import Student from "./views/student";

// Componentes del Dashboard (Asegúrate de que los nombres coincidan con tus archivos)
// Usaremos el nombre corregido: DashboardLayout
import DashboardLayout from "./views/dashboardLayout"; 
import DashboardHome from "./views/dashboardhome"; // Necesitas crear este archivo
import Profile from "./views/profile"; // Necesitas crear este archivo para /dashboard/profile
import EnrollmentsPage from './views/enrollment';

import DashboardLayout from "./views/dashboardLayout"; 
import DashboardHome from "./views/dashboardhome"; 
import Profile from "./views/profile"; 


function App() {
  return (
    <Routes>
      
      {/* 🔓 Rutas públicas (Si quieres mantener las originales, puedes usarlas así, PERO NO usarán el DashboardLayout) */}
      <Route path="/login" element={<Login />} />
      <Route path="/home" element={<HomePage />} />
      {/* Las rutas originales Student y Teacher deben eliminarse o usarse solo para fines públicos */}
      {/* <Route path="student" element={<Student />} /> */}
      {/* <Route path="teacher" element={<Teacher />} /> */}
      
      
      {/* 🔐 Contenedor del Dashboard */}
      <Route path="dashboard" element={<DashboardLayout />}>
        
        {/* Rutas de Contenido */}
        <Route index element={<DashboardHome />} />
        <Route path="profile" element={<Profile />} />
        
        {/*
        👇👇👇 AQUÍ VAN LAS NUEVAS RUTAS DE GESTIÓN
        */}

        {/* 3. Gestión de Estudiantes: Se carga en la URL: /dashboard/students */}
        <Route path="students" element={<Student />} /> 
        
        {/* 4. Gestión de Profesores: Se carga en la URL: /dashboard/teachers */}
        <Route path="teachers" element={<TeachersPage />} /> 
        <Route path='enrollment' element={<EnrollmentsPage/>} />
      </Route>
      
    </Routes>
  );
}

export default App;
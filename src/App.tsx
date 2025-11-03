import { Routes, Route, Link } from 'react-router-dom'
import './App.css'
import Login from './views/login'
import Student from './views/student'
import HomePage from './views/home'



function App() {
  return (
    <>
      

      <Routes>
        <Route element={<Student/>} path='student'/>
        <Route element={<Login/>} path='login'/>
        <Route element={<HomePage/>} path='home'/>
      </Routes>
    </>
  )
}

export default App

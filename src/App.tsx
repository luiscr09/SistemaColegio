import { Routes, Route } from 'react-router-dom'
import './App.css'
import Login from './views/login'
import Student from './views/student'
import HomePage from './views/home'
import { Teacher } from './views/teacher'

function App() {
  return (
    <>
      

      <Routes>
        <Route element={<Student/>} path='student'/>
        <Route element={<Login/>} path='login'/>
        <Route element={<HomePage/>} path='home'/>
        <Route element={<Teacher/>} path='teacher'/>
      </Routes>
    </>
  )
}

export default App

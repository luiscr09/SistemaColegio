import { Routes, Route, Link } from 'react-router-dom'
import './App.css'
import Login from './views/login'



function App() {
  return (
    <>
      

      <Routes>
        
        <Route element={<Login/>} path='login'/>
      </Routes>
    </>
  )
}

export default App

import React from 'react'
import Home from './pages/Home.jsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AdminLogin from './pages/AdminLogin.jsx'
import Dashboard from './pages/Dashboard.jsx'
import QuizPage from './pages/QuizPage.jsx'
function App() {
  return (
   <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/admin' element={<AdminLogin/>}/>
      <Route path='/dashboard' element={<Dashboard/>}/>
      <Route path='/quiz/:id' element={<QuizPage />}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App

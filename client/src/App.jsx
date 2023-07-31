import React from 'react'
import { Route, Routes } from "react-router-dom";
import Layout from './Layout';
import IndexPage from './pages/IndexPage';
import LoginPage from './pages/loginpage';
import RegisterPage from './pages/registerpage';
import AboutPage from './pages/aboutpage';



const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />} >
        <Route index element={<IndexPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/about' element={<AboutPage />} />

      </Route>

    </Routes>
  )
}

export default App
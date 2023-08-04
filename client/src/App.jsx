import React from 'react'
import { Route, Routes } from "react-router-dom";
import Layout from './Layout';
import axios from 'axios';
import UserContextProvider from './UserContext';
import IndexPage from './pages/IndexPage';
import LoginPage from './pages/loginpage';
import RegisterPage from './pages/registerpage';
import AboutPage from './pages/aboutpage';
import ProfilePage from './pages/ProfilePage';
import PostsForm from './pages/PostsForm';
import PostPage from './pages/PostPage';

axios.defaults.baseURL = 'http://localhost:3000';
axios.defaults.withCredentials = true;

const App = () => {

  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />} >
          <Route index element={<IndexPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/about' element={<AboutPage />} />
          <Route path='/account' element={<ProfilePage />} />
          <Route path='/account/expressions/:id' element={<PostsForm />} />
          <Route path='/createPost' element={<PostsForm />} />
          <Route path='/expression/:id' element={<PostPage />} />

        </Route>

      </Routes>
    </UserContextProvider>
  )
}

export default App
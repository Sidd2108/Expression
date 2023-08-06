import React, { Suspense, lazy } from 'react'
import { Route, Routes } from "react-router-dom";
const Layout = lazy(() => import("./Layout"));
import axios from 'axios';
const UserContextProvider = lazy(() => import('./UserContext'));
const IndexPage = lazy(() => import('./pages/IndexPage'));
const LoginPage = lazy(() => import('./pages/loginpage'));
const RegisterPage = lazy(() => import('./pages/registerpage'));
const AboutPage = lazy(() => import('./pages/aboutpage'));
const ProfilePage = lazy(() => import('./pages/ProfilePage'));
const PostsForm = lazy(() => import('./pages/PostsForm'));
const PostPage = lazy(() => import('./pages/PostPage'));
axios.defaults.baseURL = 'http://localhost:3000';
axios.defaults.withCredentials = true;

const App = () => {

  return (
    <Suspense fallback={<div>Loading...</div>}>
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
    </Suspense>
  )
}

export default App
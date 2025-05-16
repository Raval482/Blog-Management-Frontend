import React from 'react'
import { Routes, Route } from "react-router-dom"
import Login from './pages/Login'
import Register from './pages/Register'
import PublicLayout from './layouts/PublicLayout';
import ProtectedRoute from './middleware/ProtectedRoute';
import UserLayout from './layouts/UserLayout';
import UserDashboard from './pages/user/UserDashboard';
import AdminLayout from './layouts/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import { Toaster } from 'react-hot-toast';
import NotAuthorized from './pages/NotAuthorized';
import AdminBlogPage from './pages/admin/AdminBlogPage';
import MyBlog from './pages/user/MyBlog';
import CreateBlog from './pages/CreateBlog';
import ChangePassword from './pages/ChangePassword';
import OtpVerification from './pages/OtpVerification';
import PurchasePlan from './pages/PurchasePlan';
import Chat from "./pages/user/Chat"
import UpdateProfile from "./pages/user/UpdateProfile"

const App = () => {

  return (
    <div>

      <Routes>
          <Route element={<PublicLayout/>}>
              <Route path="/" element={<Login/>}/>
              <Route path="/register" element={<Register/>}/>
              <Route path="/verify-otp" element={<OtpVerification />} />

          </Route>

          <Route element={<ProtectedRoute role="user" />}>
              <Route element={<UserLayout/>}>
                  <Route path="/dashboard" element={<UserDashboard/>}/>
                  <Route path="/blog" element={<MyBlog/>}/>
                  <Route path="/create-blog" element={<CreateBlog/>}/>
                  <Route path="/changePassword" element={<ChangePassword/>}/>
                  <Route path="/purchese-plane" element={<PurchasePlan/>}/>
                  <Route path="/chat" element={<Chat/>}/>
                  <Route path="/profile" element={<UpdateProfile/>}/>
                  
              </Route>
          </Route>
          
          <Route element={<ProtectedRoute role="admin" />}>
              <Route element={<AdminLayout/>}>
                  <Route path="/admin/dashboard" element={<AdminDashboard/>}/>
                  <Route path="/admin/blog" element={<AdminBlogPage/>}/>
                  <Route path="/admin/request" element={<AdminDashboard/>}/>
                  <Route path="/admin/createblog" element={<CreateBlog/>}/>
                  <Route path="/admin/changePassword" element={<ChangePassword />} />
                  <Route path="/admin/chat" element={<Chat/>}/>
              </Route>
          </Route>
          <Route path="/not-authorized" element={<NotAuthorized/>} />
      </Routes>
      <Toaster />
    </div>
  )
}

export default App
import React from 'react'
import { Outlet } from 'react-router-dom';


const PublicLayout = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-purple-200">
      <Outlet />
    </div>
  )
}

export default PublicLayout
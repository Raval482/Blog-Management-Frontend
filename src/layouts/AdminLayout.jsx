import React from 'react'
import Navbar from '../components/Navbar'
import { Outlet } from 'react-router-dom'

const AdminLayout = () => {
    return (
        <div className='flex flex-column '>
            <div className='w-full'>
                <Navbar />
                <main className="flex-1  bg-gray-100">
                    <Outlet />
                </main>
            </div>

        </div>
    )
}

export default AdminLayout
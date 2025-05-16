import React from 'react'
import Navbar1 from '../components/Navbar1'
import { Outlet } from 'react-router-dom'

const UserLayout = () => {
    return (
        <div className=''>
            <Navbar1/>
        
            <div className=''>
            <main className="flex-1 p-8 bg-gray-100 ">
                <Outlet />
            </main>
            </div>
        </div>
    )
}

export default UserLayout
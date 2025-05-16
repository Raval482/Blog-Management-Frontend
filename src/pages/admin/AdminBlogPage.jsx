import axios from 'axios'
import React, { useEffect, useState } from 'react'
import BlogCard from '../../components/BlogCard'

const AdminBlogPage = () => {
    const token = sessionStorage.getItem("token")
    const [refresh,setRefresh] = useState(false)
    
    const [blogData, setBlogData] = useState([])

    const handleRefresh = () =>{
        setRefresh(!refresh)
    }


    const fetchBlog = async () => {
        try {
            const response = await axios.get("http://192.168.50.80:4000/api/blog-show", {
                headers: {
                    Authorization: token
                }
            })
            setBlogData(response?.data?.data)
        } catch (error) {
            console.log(error)
        }
    }


    useEffect(() => {
        fetchBlog()
    }, [refresh])

    return (
        <div>
        <div className='grid grid-cols-3  gap-5 mt-5 w-[90%] mx-auto p-5'>
            {
                blogData.length > 0 ? blogData.map((blog, index) => (
                    <BlogCard blog={blog} key={index} handleRefresh={handleRefresh} />
                )) : <p className="text-center text-gray-500">No Blog Found</p>
            }
        </div>
    </div>
    
    )
}

export default AdminBlogPage
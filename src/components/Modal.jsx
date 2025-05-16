import React from 'react'
import { useState } from 'react'
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react'
import axios from 'axios'
import toast from 'react-hot-toast'

const Modal = ({ open, setOpen,status,id ,handleRefresh}) => {

const [reson,setReson] = useState("")
const token = sessionStorage.getItem("token")
const handleSubmit = async(event) =>{
    event.preventDefault()
    try{
        const response = await axios.post("http://localhost:4000/api/blog-permission",{
            id : id,
            comment : reson,    
            status:status
        },{
            headers : {
                Authorization : token
            }
        }
    )
        if (response?.data?.success) {
            toast.success(response?.data?.message)
            handleRefresh()
            setOpen(false)
            setReson('')
        }
        console.log(response)

    }catch(error){
        toast.error(error?.response?.data?.message)
    }
}

    return (
        <Dialog open={open} onClose={setOpen} className="relative z-10">
            <DialogBackdrop
                transition
                className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
            />

            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <DialogPanel
                        transition
                        className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95"
                    >
                        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                            <div className="max-w-xl mx-auto flex items-center  ">

                                <div className=' bg-white p-8 rounded-2xl shadow-md w-[100%]'>
                                    <h2 className="text-2xl font-bold text-center text-purple-700 mb-6">Why ? Rejected</h2>

                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <div>
                                            <label className="block mb-2 text-gray-700 font-medium">Description</label>
                                            <textarea
                                                value={reson}
                                                onChange={(event)=>setReson(event.target.value)}
                                                rows="6"
                                                placeholder="Write your blog message here..."
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                                            />
                                        </div>

                                        <button
                                            type="submit"
                                            className="w-full py-2 px-4 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition duration-300"
                                        >
                                            Submit 
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                           
                            <button
                                type="button"
                                data-autofocus
                                onClick={() => setOpen(false)}
                                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50 sm:mt-0 sm:w-auto"
                            >
                                Cancel
                            </button>
                        </div>
                    </DialogPanel>
                </div>
            </div>
        </Dialog>
    )
}

export default Modal
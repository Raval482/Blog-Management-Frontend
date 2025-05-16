import axios from "axios";


const useAxios = async (method, url, data, headers) => {
    try {
        const response = await axios({
            method,
            url: `${import.meta.env.VITE_APP_BASEURL}/${url} `,
            data,
            headers
        })
        return response
    } catch (error) {
        if (axios.isAxiosError) {
            return error.response || "Something Went To Wrong!"
        }
    }
}


export default useAxios
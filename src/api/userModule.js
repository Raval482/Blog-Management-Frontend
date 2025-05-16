import useAxios from "./ApiServices"

class UserModule {

    login = async(req,res) => {
            try{
                const response = await useAxios("POST",api/login)

            }catch(error){

            }
    }
}
import { useEffect, useState } from "react"
import { TodoType } from "../types/Types"
import axios from "axios"
import { AUTHHEADERS } from "../utils/Headers"


const useUpdateTodo = (apiUrl : string, updates : TodoType) => {

    const [updatedTodo, setUpdatedTodo] = useState<TodoType[]>([])
    const [isLoading, setIsLoading] = useState<Boolean>(false)
    const [error, setError] = useState<Boolean>(false)

 useEffect(()=>{
    const fetchTodos = async()=>{
        try{
            setIsLoading(true)
            setError(false)
            const response = await axios.patch(apiUrl,updates, {headers : AUTHHEADERS()})
            setUpdatedTodo(response.data)
            setIsLoading(false)
        }catch(error){
            setError(true)
        }finally{
            setIsLoading(false)
        }
    }

    fetchTodos()
 },[])

  return {updatedTodo, isLoading, error,}
}

export default useUpdateTodo
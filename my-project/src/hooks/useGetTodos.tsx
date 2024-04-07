import { useEffect, useState } from "react"
import { TodoTypeFromBackend } from "../types/Types"
import axios from "axios"
import { AUTHHEADERS } from "../utils/Headers"


const useGetTodos = (apiUrl : string) => {

    const [todos, setTodos] = useState<TodoTypeFromBackend[]>([])
    const [isLoading, setIsLoading] = useState<Boolean>(false)
    const [error, setError] = useState<Boolean>(false)

 useEffect(()=>{
    const fetchTodos = async()=>{
        try{
            setIsLoading(true)
            setError(false)
            const response = await axios.get(apiUrl, {headers : AUTHHEADERS()})
            setTodos(response.data)
            setIsLoading(false)
        }catch(error){
            setError(true)
        }finally{
            setIsLoading(false)
        }
    }
    fetchTodos()
 },[])

  return {todos, isLoading, error, setTodos}
}

export default useGetTodos

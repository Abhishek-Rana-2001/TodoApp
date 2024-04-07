import { useEffect, useState } from "react"
import TodoList from "../components/TodoList";
import { MdAdd } from "react-icons/md";
import Modal from "../components/modals/Modal";
import AddTodo from "../components/AddTodo";
import { TodoType, TodoTypeFromBackend } from "../types/Types";
import axios from "axios";
import { apiUrl } from "../url/Url";
import { AUTHHEADERS } from "../utils/Headers";
import { io } from "socket.io-client";
import PushNotifications from "../components/PushNotifications";
import useGetTodos from "../hooks/useGetTodos";
import Loader from "../components/loaders/Loader";
// import { useTheme } from "../context/ThemeProvider";



const Home = () => {

  const [addTodoModalOpen, setAddTodoModalOpen ] = useState(false)
  const [todo, setTodo] = useState({
    title : "",
    description:"",
    dueTime:new Date(),
  })  


  const {todos, isLoading, error, setTodos} = useGetTodos(`${apiUrl}/api/todos`)
  const [filteredTodos, setFilteredTodos] = useState<TodoTypeFromBackend[]>([])
  const [pendingTodos, setPendingTodos] = useState<TodoTypeFromBackend[]>([])
  const [completedTodos, setCompletedTodos] = useState<TodoTypeFromBackend[]>([])
  const [query, setQuery] = useState<string>("")
  // const {bgColor} = useTheme()

  useEffect(()=>{
    const socket = io(apiUrl);

    socket.on('connect', () => {
      console.log('Connected to Socket.IO server');
    });

    return () => {
      socket.disconnect();
    };
  },[])
  useEffect(()=>{
    setFilteredTodos(todos)
    setPendingTodos(todos.filter((todo)=>{
      console.log("pending ran")
      if(new Date(todo.dueTime).getDate() === new Date().getDate()){
        if(todo.completed !== true){
          return todo
        }
      }
    }))
    setCompletedTodos(todos.filter((todo)=>{
      if(new Date(todo.dueTime).getDate() === new Date().getDate()){
        console.log("completed ran")
        if(todo.completed === true){
          return todo
        }
      }
    }))
  },[todos])
  


  useEffect(()=>{
    const timer = setTimeout(()=>{
      const handleSearch = ()=>{
        if(query !== ""){
          const searchedtodos = todos.filter((todo)=>{
            return todo.title.toLowerCase().includes(query.toLowerCase())
          })
            setFilteredTodos(searchedtodos)
            return;
        }else{
            setFilteredTodos(todos)
        }
      }

      if(todos.length  > 0){
        handleSearch()
      }
    },800)

    return (()=>{
      clearTimeout(timer)
    })
     
  },[query])

  const handleDelete = async(id:string)=>{
      await axios.delete(`${apiUrl}/api/todo/${id}`, {headers:AUTHHEADERS()})
      .then(res=>{
        if(res.data.message === "Todo Deleted Successfully"){
          setTodos(todos.filter((item:TodoTypeFromBackend)=> item.id !== id))
        }
      })
      .catch(err=>{
        alert("Couldn't find the todo")
      })
  }


  const handleAddTodo = async(e: React.FormEvent)=>{
    e.preventDefault();
    console.log(new Date(todo.dueTime))
    const newTodo : TodoType = {
      title : todo.title,
      description:todo.description,
      dueTime : new Date(todo.dueTime)
    }
    await axios.post(`${apiUrl}/api/todo`, newTodo, {headers : AUTHHEADERS()})
    .then(res=>{
      setTodos(oldTodos =>[...oldTodos,res.data])
      setAddTodoModalOpen(false)
    })
    .catch((err)=>console.log(err))
  }

  const handleModal = ()=>{
    setAddTodoModalOpen(!addTodoModalOpen)
  }

  if(error){
    return <div>Something went wrong</div>
  }



  return (
   <>
   {addTodoModalOpen && <Modal handleClick={handleModal}><AddTodo todo={todo} setTodo={setTodo} handleSubmit={handleAddTodo}/></Modal>}
     <div className="w-full flex flex-col h-full items-center gap-3">
      <div className="md:w-1/2 w-full p-2 flex gap-4 " >
      <input  type="text" placeholder="Search the task" className="p-2 bg-[#333] text-black rounded-xl flex-1" onChange={(e)=>setQuery(e.target.value)}/>
      <button className={`md:text-lg text-sm rounded-xl px-3 py-2 font-semibold bg-white text-black flex gap-1 items-center`} onClick={handleModal}>Add Task <MdAdd/></button>
      </div>
      <h1 className="font-bold text-xl">Pending Tasks</h1>
      {isLoading && <Loader/>}

      <div className="flex gap-2 h-full p-5 w-full">
      {!isLoading && <TodoList setTodos={setTodos}  title="Pending"  handleDelete={handleDelete} todos={pendingTodos} type="pending"/>}
      {!isLoading && <TodoList setTodos={setTodos}  title="Completed"  handleDelete={handleDelete} todos={completedTodos} type="completed"/>}
      </div>
      <PushNotifications/>
     </div>
   </>
  )
}

export default Home

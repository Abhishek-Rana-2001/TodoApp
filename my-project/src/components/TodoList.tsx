import { useState } from "react";
import {TodoTypeFromBackend } from "../types/Types";
import Todo from "./Todo"
import { motion } from "framer-motion";
import { ContextMenu } from "./contextMenu/ContextMenu";
import axios from "axios";
import { apiUrl } from "../url/Url";
import { AUTHHEADERS } from "../utils/Headers";
type HandleDeleteFunction = (id: string) => Promise<void>;

interface TodoListProps {
    todos: TodoTypeFromBackend[];
    handleDelete:HandleDeleteFunction;
    title:string,
    setTodos : React.Dispatch<React.SetStateAction<TodoTypeFromBackend[]>>,
    type:string
};



function TodoList({todos, handleDelete, title, setTodos, type} : TodoListProps) {

  const initialContextMenu = {
    show: false , 
    x :0 , 
    y :0,
    id:""
  }

  const [showContextMenu, setShowContextMenu] = useState(initialContextMenu)

  const handleContextMenu = (e:React.MouseEvent<HTMLElement>, id:string)=>{
     e.preventDefault()
     const {pageX, pageY} = e
     setShowContextMenu({show:true , x:pageX, y:pageY, id:id})
  }

  const handleContextMenuClose = ()=>{
     setShowContextMenu(initialContextMenu)
  }

  const handleComplete = async(id:string)=>{
     await axios.patch(`${apiUrl}/api/todo/${id}`,{completed : true} ,{headers : AUTHHEADERS()})
     .then(res=>{
       setTodos(todos.map(todo=>{
        if(todo.id === res.data._id ){
          return  {...todo , completed : true}
        }
        return todo
       }))
      handleContextMenuClose()
     })
     .catch(err=>console.log(err))
  }


  const fadeInVariants = {
    initial:{
      opacity : 0,
      x:100
    },
    animate :(index:number)=>({
      opacity:1,
      x:0,
      transition:{delay:.1*index}
    })
  }
  return (
   <div className="flex flex-col flex-1 gap-2">
    {showContextMenu.show && type === "pending" && <ContextMenu x={showContextMenu.x} y={showContextMenu.y} handleClose={handleContextMenuClose} handleComplete={handleComplete} id={showContextMenu.id}/>}
   <h2 className="text-center font-semibold">{title}</h2>
    <ul className={`w-full md:h-3/4 h-full flex flex-col items-center overflow-y-auto gap-2`} >
        {todos.map((todo, index)=>{
          return <motion.li key={todo.id} onContextMenu={(e) => handleContextMenu(e, todo.id)} className=" w-2/3" variants={fadeInVariants} initial="initial" animate="animate" custom={index}><Todo todo={todo} handleDelete={handleDelete}/></motion.li>
        })}
    </ul>
  </div>
  )
}

export default TodoList

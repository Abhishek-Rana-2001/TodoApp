import { TodoTypeFromBackend } from "../types/Types"
import { MdDelete } from "react-icons/md";

type HandleDeleteFunction = (id: string) => Promise<void>;

interface TodoProps {
  todo: TodoTypeFromBackend;
  handleDelete: HandleDeleteFunction;
}

const Todo = ({todo,handleDelete } : TodoProps) => {
  const formattedDate = new Intl.DateTimeFormat('en-US', {
    day: '2-digit',
    month: 'short',
  }).format(new Date(todo.dueTime));
  
  return (
    <div className="md:w-full w-full h-full p-2 border border-white rounded-lg flex flex-col justify-between gap-2 hover:bg-[#f1ecec] hover:text-black hover:cursor-pointer transition-colors ease-in" >
      <div className="flex flex-col"> 
       <h3 className="font-bold text-lg text-left ">{todo.title}</h3>
       <span className="text-left">
        {todo.description}
      </span>
      </div>
       <span className="flex gap-2">
       <h3>{formattedDate}{" "}</h3>
       </span>
       <MdDelete size={30} className=" hover:cursor-pointer hover:scale-110 transition-transform ease-in-out self-end" onClick={()=>handleDelete(todo.id)}/>
    </div>
  )
}

export default Todo

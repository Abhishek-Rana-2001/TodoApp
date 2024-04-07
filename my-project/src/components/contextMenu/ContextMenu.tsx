import { useRef } from "react"
import useOnClickOutside from "../../hooks/useOnClickOutside"

interface ContextMenuProps{
   x:number,
   y:number,
   id:string,
   handleClose:()=>void,
   handleComplete:(id:string)=>Promise<void>
}

export const ContextMenu = ({ x, y, handleClose , handleComplete, id}: ContextMenuProps) => {
    const contextref = useRef<HTMLDivElement>(null)
    useOnClickOutside(contextref, handleClose)
  return (
    <div ref={contextref} onClick={()=>handleComplete(id)} className="text-black absolute p-2 bg-white z-20 hover:bg-blue-500 hover:text-white rounded-md select-none " style={{top:`${y}px` , left:`${x}px`}}>Mark as Complete</div>
  )
}
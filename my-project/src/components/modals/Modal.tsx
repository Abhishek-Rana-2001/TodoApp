import { ReactNode } from "react"
import {motion} from "framer-motion"

interface ModalProps {
    children: ReactNode ,
    handleClick: ()=>void
}

const Modal  = ({children , handleClick} : ModalProps) => {
  return (
    <div className="fixed inset-0 z-10 flex justify-center items-center">
      <div className="absolute inset-0 bg-gray-700 blur-sm bg-opacity-60" onClick={handleClick}></div>
      <motion.div className="relative md:w-3/4 w-3/4 md:h-2/3 h-3/4 bg-white z-20 flex rounded-md" initial={{y:-100, opacity:0}} animate={{y:0, opacity:1}} exit={{y:-100, opacity:0}} transition={{duration:0.3, ease:"easeInOut"}}  onClick={(e)=>{e.stopPropagation()}}>
        {children}
      </motion.div>
    </div>
  )
}

export default Modal

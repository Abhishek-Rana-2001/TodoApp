import { PropsWithChildren, createContext, useContext, useState } from "react"

type ThemeContextType = {
    bgColor: string | null;
    setBgColor:React.Dispatch<React.SetStateAction<string | null>>
}

type ThemeProviderProps = PropsWithChildren

const ThemeContext = createContext<ThemeContextType | null>(null)


export const ThemeProvider = ({children} : ThemeProviderProps)=>{
  const [bgColor, setBgColor] = useState<string | null>(`bg-[#222]`)


  const value = {
    bgColor,
    setBgColor
  }

  return <ThemeContext.Provider value={value} >{children}</ThemeContext.Provider>
}


export const useTheme = ()=>{
    const Context = useContext(ThemeContext)

    if(Context === null){
        throw new Error("useTheme must be used within a ThemeProvider")
    }

    return Context
}
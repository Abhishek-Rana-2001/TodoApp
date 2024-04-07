export type TodoTypeFromFrontend = {
  title: string;
  description: string;
  dueTime: Date;
};

export type TodoTypeFromBackend = {
  id: string;
  title: string;
  description: string;
  dueTime: Date;
  notified: boolean;
  completed: boolean;
};

export type User = {
    id:string ,
  access:string,
}

export type authContextType = {
  user:User | null,
  setUser: React.Dispatch<React.SetStateAction<User | null>>,
  isLoggedIn:boolean,
  setIsLoggedIn:React.Dispatch<React.SetStateAction<boolean>>
}

export type TodoType = TodoTypeFromFrontend | TodoTypeFromBackend;

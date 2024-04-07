
export const AUTHHEADERS = ()=> {
    const user = JSON.parse(localStorage.getItem("user") || "")
    if(user!== null){
        return {
            Authorization : `Bearer ${user.access}`
        }
    }
}

export const APPHEADERS = ()=>{
    const token = JSON.parse(localStorage.getItem("user") || "");
    return {
        "Content-Type" : "application/json",
        Authorization : `Bearer ${token.access}`
    }
}
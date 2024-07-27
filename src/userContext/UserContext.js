import axios from "axios";
import { createContext ,useState, useEffect} from "react";

export const userContext=createContext({})
export function UserContextProvider({children}){
    const[user, setUser]=useState(null)
    const[email, setEmail]=useState(null)
    const[orderLimit, setOrderLimit]=useState(0)

   const getUserInfo=async ()=>{
        try {
          const token = localStorage.getItem('authToken'); 
          const response = await axios.get('http://localhost:5019/user', {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          setEmail(response.data.email)
          setUser(response.data)
        } catch (error) {
          console.error(error); 
        }
      
      }
      useEffect(() => {
        getUserInfo();
      }, [1000]);
    return(
        <userContext.Provider value={{user,setUser,email,orderLimit,setOrderLimit}}>
            {children}
        </userContext.Provider>
    )
}
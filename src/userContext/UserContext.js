import axios from "axios";
import { createContext ,useState, useEffect} from "react";

export const userContext=createContext({})
export function UserContextProvider({children}){
    const[user, setUser]=useState(null)
    const[email, setEmail]=useState(null)
    const[authenticated,setAuthenticated ]=useState(false)

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
          setAuthenticated(true);
        } catch (error) {
          console.error(error); 
        }
      
      }
      useEffect(() => {
        getUserInfo();
      }, [user]);
    return(
        <userContext.Provider value={{user,setUser,email,authenticated,getUserInfo}}>
            {children}
        </userContext.Provider>
    )
}
import { createContext } from "react";
import { useState} from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { login as loginService, signup as signupService , getMe} from "../services/authService";

const AuthContext = createContext();
const AuthProvider = ({children})=>{
    const [user,setUser]= useState(null);
    const [loading, setLoading] = useState(true);

    const login = async (data)=>{
    const res = await loginService(data);
    localStorage.setItem('token',res.token);
    setUser(res.user);
    }

    const signup = async (data)=>{
    const res = await signupService(data);
    console.log(res);
    localStorage.setItem('token',res.token);
    setUser(res.user);
    }

    const logout = ()=>{
        localStorage.removeItem('token');
        setUser(null);
    }
    useEffect(()=>{
    const restore = async ()=>{
        const token = localStorage.getItem('token');
        if(token){
            const res = await getMe();
            setUser(res.user);
        }
        setLoading(false);
    }
    restore();
    },[]);
    return(
        <AuthContext.Provider value={{user,login,signup,logout,loading}}>
            {children}
        </AuthContext.Provider>
    );
}
export const useAuth = ()=> useContext(AuthContext);
export default AuthProvider;
import { useState, useRef } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

function Login(){
const {login} = useAuth();
const navigate = useNavigate();
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const emailRef = useRef();
const passwordRef = useRef();
const {theme} = useTheme();

async function handleSubmit(e){
    e.preventDefault();
    if(!emailRef.current.value || !passwordRef.current.value){
        alert("Please fill in all fields");
        return;
    }
    const emailVal = emailRef.current.value;
    const passwordVal = passwordRef.current.value;
    await login({email: emailVal, password: passwordVal});
    navigate('/');
}

return(
    <div className="flex items-center justify-center min-h-screen">
        
        <div className={`flex flex-col gap-6 rounded-2xl w-96 p-10 mb-4 ${theme === 'dark' ? 'bg-zinc-900' : 'bg-zinc-100'}`}>
            <h1 className="text-3xl text-yellow-400 tracking-widest font-bold text-center">VELOUR</h1>
            <p className={`text-sm text-center ${theme === 'dark' ? 'text-white/50' : 'text-black/50'}`}>Sign in to your account</p>
           
            <form onSubmit={handleSubmit}>
                <input className={`border ${theme === 'dark' ? 'border-white/30 text-white' : 'border-black/30 text-black'} bg-transparent rounded-lg px-4 py-3 w-full outline-none mb-4`} type="email" ref={emailRef} placeholder="Enter E-mail.." onChange={(e)=> setEmail(e.target.value)}/>
                
                <input className={`border ${theme === 'dark' ? 'border-white/30 text-white' : 'border-black/30 text-black'} bg-transparent rounded-lg px-4 py-3 w-full outline-none mb-4`} type="password" ref={passwordRef} placeholder="Enter password.." onChange={(e)=> setPassword(e.target.value)}/>
                
                <button className="hover:shadow-[0_0_20px_rgba(255,255,255,0.6)] transition-all duration-200 w-full bg-yellow-400 text-black py-3 font-bold tracking-widest rounded-lg mb-4" type="submit">Submit</button>
               
                <p className={`text-sm text-center ${theme === 'dark' ? 'text-white/50' : 'text-black/50'}`}>Don't have an account?<Link className="text-yellow-400" to="/signup"> Sign up</Link></p>
            </form>
        </div>
    </div>
);
}
export default Login;
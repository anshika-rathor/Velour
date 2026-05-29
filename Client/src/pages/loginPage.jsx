import { useState , useRef } from "react";
import { useAuth } from "../context/AuthContext";
import {Link, useNavigate} from "react-router-dom";

function Login(){
const {login} = useAuth();
const navigate = useNavigate();
const [email,setEmail] = useState("");
const [password,setPassword] = useState("");
const emailRef = useRef();
const passwordRef = useRef();
 async function handleSubmit(e){
    e.preventDefault();
    if(!emailRef.current.value || !passwordRef.current.value){
    alert("Please fill in all fields");
    return;
     }
     const emailVal = emailRef.current.value;
     const passwordVal = passwordRef.current.value;
     console.log({emailVal, passwordVal});
    await login({email:emailVal,password: passwordVal});
    navigate('/');
}
return(
    <div className="flex  items-center justify-center bg-black min-h-screen text-white ">
        <div className="flex flex-col gap-6 big-zinc-900 rounded-2xl w-96 p-10 mb-4 ">
            <h1 className="text-3xl text-yellow-400 tracking-widest font-bold text-center">VELOUR</h1>
            <p className="text-white/50 text-sm text-center" >Sign in to your account</p>
        <form onSubmit={handleSubmit}>
            <input className="border border-white/30 bg-transparent rounded-lg px-4 py-3 w-full text-white outline-none mb-4" type ="email" ref={emailRef} placeholder="Enter E-mail.." 
            onChange={(e)=> setEmail(e.target.value)} />
            <input  className="border border-white/30 bg-transparent rounded-lg px-4 py-3 w-full text-white outline-none mb-4"  type ="password" ref={passwordRef} placeholder="Enter password.."
             onChange={(e)=> setPassword(e.target.value)} />
            <button className="hover:shadow-[0_0_20px_rgba(255,255,255,0.6)] transition-all duration-200 w-full bg-yellow-400 text-black py-3 font-bold tracking-widest rounded-lg mb-4"  type="submit" >Submit</button>
            <p className="text-white/50 text-sm text-center"> Don't have an account?<Link className="text-yellow-400" to="/signup"> Sign up</Link>
            </p>
        </form>
        </div>
    </div>
);
}
export default Login;
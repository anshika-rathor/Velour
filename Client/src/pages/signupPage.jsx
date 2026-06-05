import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

function Signup(){
const {signup} = useAuth();
const navigate = useNavigate();
const [email, setEmail] = useState("");
const [name, setName] = useState("");
const [phone, setPhone] = useState("");
const [password, setPassword] = useState("");
const {theme} = useTheme();

async function handleSubmit(e){
    e.preventDefault();
    if(!email || !password || !name || !phone){
        alert("Please fill in all fields");
        return;
    }
    try{
        await signup({email, password, name, phone});
        navigate('/');
    }
    catch(err){
        console.log(err);
    }
}

return(
    <div className="flex items-center justify-center min-h-screen">
        <div className={`flex flex-col gap-6 rounded-2xl w-96 p-10 mb-4 ${theme === 'dark' ? 'bg-zinc-900' : 'bg-zinc-100'}`}>
            <h1 className="text-3xl text-yellow-400 tracking-widest font-bold text-center">VELOUR</h1>
            <form onSubmit={handleSubmit}>
                <input className={`border ${theme === 'dark' ? 'border-white/30 text-white' : 'border-black/30 text-black'} bg-transparent rounded-lg px-4 py-2 mb-4 w-full outline-none`} type="email" placeholder="Enter E-mail.." onChange={(e)=> setEmail(e.target.value)}/>
                <input className={`border ${theme === 'dark' ? 'border-white/30 text-white' : 'border-black/30 text-black'} bg-transparent rounded-lg px-4 py-2 mb-4 w-full outline-none`} type="password" placeholder="Enter password.." onChange={(e)=> setPassword(e.target.value)}/>
                <input className={`border ${theme === 'dark' ? 'border-white/30 text-white' : 'border-black/30 text-black'} bg-transparent rounded-lg px-4 py-2 mb-4 w-full outline-none`} type="text" placeholder="Enter name.." onChange={(e)=> setName(e.target.value)}/>
                <input className={`border ${theme === 'dark' ? 'border-white/30 text-white' : 'border-black/30 text-black'} bg-transparent rounded-lg px-4 py-2 mb-4 w-full outline-none`} type="text" placeholder="Enter Phone.." onChange={(e)=> setPhone(e.target.value)}/>
                <button className="hover:shadow-[0_0_20px_rgba(255,255,255,0.6)] transition-all duration-200 bg-yellow-400 w-full text-black font-bold py-3 tracking-widest rounded-lg mb-2" type="submit">Submit</button>
                <p className={`text-sm text-center ${theme === 'dark' ? 'text-white/50' : 'text-black/50'}`}>Already have an account?<Link className="text-yellow-400" to="/login"> Sign in</Link></p>
            </form>
        </div>
    </div>
);
}
export default Signup;
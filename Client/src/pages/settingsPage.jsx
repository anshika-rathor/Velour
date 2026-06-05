import {useState , useEffect} from 'react';
import {useTheme} from '../context/ThemeContext';
import{getMe , updateMe} from '../services/authService';

function Settings(){
const [activeSection,setActiveSection] = useState('theme');
const [userInfo,setUserInfo] = useState(null);
const [editMode,setEditMode]= useState(false);
const [formData,setFormData] = useState({name:"",email:"",phone:""});
const {theme , toggleTheme} = useTheme();
useEffect(()=>{
    async function fetchUser(){
        if(activeSection === 'account'){
            const res = await getMe();
            setUserInfo(res.user);
            setFormData({name: res.user.name, email: res.user.email, phone: res.user.phone});
        }
    }
    fetchUser();
},[activeSection]);

async function handleSave(){
    const result = await updateMe(formData);
    setUserInfo(result.user);
    setEditMode(false);
}

 function handleChange(e){
    setFormData({...formData,[e.target.name]: e.target.value});

}

return(
    <div className = "flex min-h-screen ">
        <div className ={`${theme === 'dark' ? 'border-r border-white/20' : 'border-r border-black/20'} w-64  p-8 flex flex-col gap-4`}>
        <h2 className = "text-yellow-400 mb-4 text-xl font-bold tracking-widest ">SETTINGS</h2>
        <button onClick={() => setActiveSection('account')} className={`text-left   tracking-wide text-sm py-2 transition-all duration-200 ${activeSection === 'account' ? 'text-yellow-400' : `${theme === 'dark' ? 'text-white/60' : 'text-black/60'} hover:text-yellow-400`}`}>Account Info</button>

        <button onClick={() => setActiveSection('addresses')} className={`text-left tracking-wide text-sm py-2 transition-all duration-200 ${activeSection === 'addresses' ? 'text-yellow-400' : `${theme === 'dark' ? 'text-white/60' : 'text-black/60'} hover:text-yellow-400`}`}>Addresses</button>

       <button onClick={() => setActiveSection('theme')} className={`text-left tracking-wide text-sm py-2 transition-all duration-200 ${activeSection === 'theme' ? 'text-yellow-400' : `${theme === 'dark' ? 'text-white/60' : 'text-black/60'} hover:text-yellow-400`}`}>Theme</button>

       <button onClick={() => setActiveSection('privacy')} className={`text-left tracking-wide text-sm py-2 transition-all duration-200 ${activeSection === 'privacy' ? 'text-yellow-400' : `${theme === 'dark' ? 'text-white/60' : 'text-black/60'} hover:text-yellow-400`}`}>Privacy</button>

       <button onClick={() => setActiveSection('security')} className={`text-left tracking-wide text-sm py-2 transition-all duration-200 ${activeSection === 'security' ? 'text-yellow-400' : `${theme === 'dark' ? 'text-white/60' : 'text-black/60'} hover:text-yellow-400`}`}>Data & Security</button>

       <button onClick={() => setActiveSection('help')} className={`text-left tracking-wide text-sm py-2 transition-all duration-200 ${activeSection === 'help' ? 'text-yellow-400' : `${theme === 'dark' ? 'text-white/60' : 'text-black/60'} hover:text-yellow-400`}`}>Help</button>
       
        </div>
        
        <div className ="flex-1 p-8">
            {activeSection === 'theme' && (
                <div>
                    <h3 className="text-xl font-bold mb-4">THEME</h3>
                    <p className ={`${theme === 'dark' ? 'text-white/50' : 'text-black/50'}   mb-6 text-sm`} >{theme}</p>
                    <button className="px-6 py-3 bg-yellow-400 text-black font-bold rounded-lg tracking-widest hover:shadow-[0_0_20px_rgba(255,255,255,0.4)] transition-all duration-200" type="button" onClick={toggleTheme}>Switch to {theme === 'dark' ? 'Light':'Dark'}</button>
                </div>
            )}
            {activeSection === 'account' && (
                <div>
                    <h3 className ={`${theme === 'dark' ? 'text-white' : 'text-black'} text-2xl font-bold tracking-widest`}>ACCOUNT INFO</h3>
                    <div className="mt-8 flex flex-col gap-6 max-w-md">
                        <p className='text-sm tracking-widest'>Name</p>
                        <input className="w-full px-4 py-2 rounded-lg border bg-transparent outline-none text-sm" type="text" name='name' value={formData.name} onChange={handleChange} readOnly={!editMode} />

                        <p className='text-sm tracking-widest'>E-mail</p>
                        <input className="w-full px-4 py-2 rounded-lg border bg-transparent outline-none text-sm" type="email" name="email" value={formData.email} onChange={handleChange} readOnly={!editMode} />

                        <p className="text-sm tracking-widest">Phone</p>
                        <input className="w-full px-4 py-2 rounded-lg border bg-transparent outline-none text-sm" type="tel" name="phone" value={formData.phone} onChange={handleChange} readOnly={!editMode} />
                       
                        <div className="flex gap-4 mt-4">
                            {!editMode  && <button className="px-6 py-2 rounded-lg border border-yellow-400 text-yellow-400 text-sm font-bold tracking-widest hover:shadow-[0_0_20px_rgba(255,215,0,0.4)] transition-all duration-200"  onClick={()=> setEditMode(true)}>Edit</button>}
                           {editMode &&  <button className = "px-6 py-2 rounded-lg bg-yellow-400 text-black text-sm font-bold tracking-widest hover:shadow-[0_0_20px_rgba(255,255,255,0.4)] transition-all duration-200"   onClick ={handleSave}>Save</button>}
                        </div>
                    </div>
                </div>

            )}
            {activeSection === 'addresses' && (
                <div>
                    <h3 className ={`${theme === 'dark' ? 'text-white' : 'text-black'} text-2xl font-bold tracking-widest`}>SAVED ADDRESS</h3>
                </div>

            )}
             {activeSection === 'privacy' && (
                <div>
                    <h3 className ={`${theme === 'dark' ? 'text-white' : 'text-black'} text-2xl font-bold tracking-widest`}>PRIVACY SETTINGS</h3>
                </div>

            )}
             {activeSection === 'security' && (
                <div>
                    <h3 className ={`${theme === 'dark' ? 'text-white' : 'text-black'} text-2xl font-bold tracking-widest`}>DATA & SECURITY</h3>
                </div>

            )}
             {activeSection === 'help' && (
                <div>
                    <h3 className ={`${theme === 'dark' ? 'text-white' : 'text-black'} text-2xl font-bold tracking-widest`}>HELP</h3>
                </div>

            )}
        </div>
    </div>
);
}
export default Settings;
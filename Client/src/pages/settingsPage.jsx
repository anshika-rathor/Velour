import {useState} from 'react';
import {useTheme} from '../context/ThemeContext';

function Settings(){
const [activeSection,setActiveSection] = useState('theme');
const {theme , toggleTheme} = useTheme();
return(
    <div className = "flex min-h-screen ">
        <div className ="w-64 border-r border-white/20 p-8 flex flex-col gap-4">
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
                    <p className ="text-white/50 mb-6 text-sm">{theme}</p>
                    <button className="px-6 py-3 bg-yellow-400 text-black font-bold rounded-lg tracking-widest hover:shadow-[0_0_20px_rgba(255,255,255,0.4)] transition-all duration-200" type="button" onClick={toggleTheme}>Switch to {theme === 'dark' ? 'Light':'Dark'}</button>
                </div>
            )}
            {activeSection === 'account' && (
                <div>
                    <h3 className ="text-2xl font-bold tracking-widest text-white">ACCOUNT INFO</h3>
                </div>

            )}
            {activeSection === 'addresses' && (
                <div>
                    <h3 className ="text-2xl font-bold tracking-widest text-white"> SAVED ADDRESS</h3>
                </div>

            )}
             {activeSection === 'privacy' && (
                <div>
                    <h3 className ="text-2xl font-bold tracking-widest text-white">PRIVACY SETTINGS</h3>
                </div>

            )}
             {activeSection === 'security' && (
                <div>
                    <h3 className ="text-2xl font-bold tracking-widest text-white">DATA & SECURITY</h3>
                </div>

            )}
             {activeSection === 'help' && (
                <div>
                    <h3 className ="text-2xl font-bold tracking-widest text-white">HELP</h3>
                </div>

            )}
        </div>
    </div>
);
}
export default Settings;
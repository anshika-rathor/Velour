import { useTheme } from "../context/ThemeContext";
import { useEffect } from "react";
import Navbar from "./Navbar";
function Layout({children}){
    const {theme} = useTheme();
    useEffect(() => {
    document.body.className = theme === 'dark' ? 'bg-black text-white' : 'bg-white text-black';
}, [theme]);
    return(
        
        <div >
         <div>
            <Navbar />
        {children}
        </div>
        </div>
        
    );
}
export default Layout;
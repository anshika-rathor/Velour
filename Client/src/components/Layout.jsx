import { useTheme } from "../context/ThemeContext";
import { useEffect } from "react";
function Layout({children}){
    const {theme} = useTheme();
    useEffect(() => {
    document.body.className = theme === 'dark' ? 'bg-black text-white' : 'bg-white text-black';
}, [theme]);
    return(
        <div >
        {children}
        </div>
    );
}
export default Layout;
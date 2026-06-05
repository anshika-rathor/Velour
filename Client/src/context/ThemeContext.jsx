import {createContext,useState,useContext, useEffect} from 'react';
const ThemeContext = createContext();
export function useTheme(){return useContext (ThemeContext);}
function ThemeProvider({children}){
    const [theme,setTheme] = useState(localStorage.getItem('theme') || 'dark');
     useEffect(()=>{
            localStorage.setItem('theme', theme);
        },[theme]);
    function toggleTheme(){
        setTheme((prevTheme)=>(prevTheme === 'dark' ? "light" : "dark"));
       
    }
    return(
        <ThemeContext.Provider value={{theme,toggleTheme}}>
            {children}
        </ThemeContext.Provider>
    );
   
}
export default ThemeProvider;
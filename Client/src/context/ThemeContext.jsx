import {createContext,useState,useContext} from 'react';
const ThemeContext = createContext();
export function useTheme(){return useContext (ThemeContext);}
function ThemeProvider({children}){
    const [theme,setTheme] = useState('dark');
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
 import {Link} from "react-router-dom";
 import {useTheme} from "../context/ThemeContext";
 import {useNavigate} from "react-router-dom";
 import {useAuth} from "../context/AuthContext";
 function Navbar(){
    const navigate = useNavigate();
    const {logout} = useAuth();
    const {theme} = useTheme();
    const handleLogout = ()=>{
        logout();
        navigate('/login');
    }
    return(
        
            <nav className={`flex items-center justify-between px-8 py-4 border-b ${theme === 'dark' ? 'border-white/10' : 'border-black/10'}`}>
                <h1 className="text-2xl text-yellow-400 font-bold tracking-widest">Velour</h1>
                
                <div className="flex gap-4 text-sm">
                    <Link to="/cart">Cart</Link>
                    <Link to="/wishlist">Wishlist</Link>
                    <Link to="/settings">Settings</Link>
                    <Link to="/">Home</Link>
                    <Link to="/products">Products</Link>
                </div>
                <button onClick={handleLogout} className="text-sm text-red-400 hover:text-yellow-400 transition-all">Logout</button>
            </nav>
    );
   
 }
 export default Navbar;
 
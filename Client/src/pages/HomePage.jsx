import { useNavigate , Link} from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Home(){
    const navigate = useNavigate();
    const {user,logout} = useAuth();
    
    const handleLogout = ()=>{
        logout();
        navigate('/login');
    }
    if(!user) return <div>Loading...</div>
    const categories = ['Women', 'Men', 'Accessories', 'Footwear', 'Sale'];
    const products = [
  { id: 1, name: 'Silk Evening Gown', price: '₹1999' ,image: 'https://placehold.co/300x400/1a1a1a/gold?text=Velour'},
  { id: 2, name: 'Premium Kurta Set', price: '₹1999',image: 'https://placehold.co/300x400/1a1a1a/gold?text=Velour' },
  { id: 3, name: 'Embroidered Lehenga', price: '₹4,999' , image: 'https://placehold.co/300x400/1a1a1a/gold?text=Velour'},
  { id: 4, name: 'Structured Blazer', price: '₹3,499',image: 'https://placehold.co/300x400/1a1a1a/gold?text=Velour' },
];
    return(
        <div className="min-h-screen  ">
            <nav className="flex items-center  justify-between  px-8 py-4  border-b  border-white/10">
           
            <h1 className="text-2xl text-yellow-400 font-bold tracking-widest ">Velour</h1>
           
            <div className="flex gap-6 text-white/70  text-sm">
            {categories.map(cat=>(
                <span key={cat}>{cat}</span>
            ))}
        
            </div>
            <div className="flex gap-4 text-sm ">
             <Link to="/cart">Cart</Link>
            <Link to="/account">Account</Link>
           </div>
            </nav>

            <div className="flex items-center justify-center flex-col text-center h-[80vh]">
            <p className="text-yellow-400 tracking-widest text-sm mb-4">NEW COLLECTION 2026</p>
            <h2 className="text-6xl font-bold tracking-tight mb-4">Define Your Era</h2>
            <p className="text-lg mb-8 text-white/50">Premium fashion, curated for you.</p>
            <Link to="/products" className = "text-black bg-yellow-400 px-8 py-3 font-bold tracking-widest ">Shop Now</Link>
            </div>
           <h3 className ="text-2xl font-bold tracking-widest text-center mb-8 px-8 pt-16" >FEATURED</h3>
           <div className="grid grid-cols-4 gap-6 px-8 py-16">
            {products.map(pro =>(
             <div key = {pro.id}>
                <img className="w-full object-cover h-64" src={pro.image} alt={pro.name} ></img>
                <p>{pro.name}</p>
                <p className="text-yellow-400">{pro.price}</p>
             </div>  
            ))}
           </div>
           <footer className="text-sm tracking-widest border-t border-white/10 px-8 py-6 text-center text-white/30">© 2026 VELOUR. ALL RIGHTS RESERVED.</footer>
        </div>
        
    );
}
export default Home;

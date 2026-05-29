 import {useState , useEffect} from "react";
import {getAllProducts} from '../services/productService';

function ProductsPage(){
    const [products,setProducts] = useState([]);
    const [loading,setLoading] = useState(true);

    useEffect(() =>{
        async function fetchProduct(){
            const data = await getAllProducts();
            setProducts(data);
            setLoading(false);
        }
        fetchProduct();
    },[]);

    if(loading){
        return(
            <p className="text-white text-center mt-10">Loading...</p>
        );
    }

    return(
        <div className="bg-black min-h-screen px-10 py-10">
            <h1 className="text-yellow-400 tracking-widest text-3xl font-bold mb-7 text-center">OUR COLLECTION</h1>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-8">
                {products.map((items) =>(
                <div className="border border-white/10 rounded-2xl overflow-hidden hover:shadow-[0_0_25px_rgba(255,215,0,0.3)] transition-all duration-300" key={items._id}>
                    <img className="w-full h-72 object-cover" src={items.image} alt={items.name}/>
                    <div className="p-5 flex flex-col gap-3">
                        <p className="text-xs text-white/40 uppercase tracking-widest">{items.category}</p>
                        <h2 className="text-lg font-semibold text-white">{items.name}</h2>
                        <p className="text-yellow-400 font-bold">₹{items.price}</p>
                        <div className="flex gap-2 flex-wrap">
                            {items.size.map((s)=>(
                                <span className="border border-white/20 text-xs px-2 py-1 rounded-md text-white/60" key={s}>{s}</span>
                            ))}
                        </div>
                        <button className="mt-2 w-full bg-yellow-400 text-black font-bold py-2 rounded-lg tracking-widest hover:shadow-[0_0_15px_rgba(255,255,255,0.4)] transition-all duration-200" type="button">ADD TO CART</button>
                    </div>
                </div>
                ))}
            </div>
        </div>
    );
}

export default ProductsPage;
import {useState, useEffect} from 'react';
import {getCart, removeItem, updateItem} from '../services/cartService';
import {useTheme} from '../context/ThemeContext';
import {getProductsById} from '../services/productService';

function CartPage(){
const [cart, setCart] = useState(null);
const [loading, setLoading] = useState(true);
const [prodDetails,setProdDetails] = useState([]);
const {theme} = useTheme();

useEffect(()=>{
    async function fetchCart(){
        const cart = await getCart();
        setCart(cart);
        setLoading(false);
    }
    fetchCart();
},[]);

useEffect(()=>{
    if(cart && cart.products.length > 0){
        async function fetchAll(){
            const details = await Promise.all(cart.products.map(item => getProductsById(item.productId)));
            const combined = details.map((product , index)=>({
                ...product,quantity:cart.products[index].quantity,cartItemId:cart.products[index]._id
            }));
            setProdDetails(combined);
        }
        fetchAll();
        
    }
},[cart]);

if(loading){
    return(
        <p className="text-center mt-10">Loading...</p>
    );
}
if(!cart || cart.products.length === 0){
    return(
        <p className={`${theme === 'dark' ? 'text-white/50' : 'text-black/50'} text-center mt-10`}>Your cart is empty.</p>
    );
}

async function handleRemove(productId){
    await removeItem({productId});
    const updated = await getCart();
    setCart(updated);
}

async function handleUpdate(cartItemId , newQuantity){
    if(newQuantity <=  0){
        await handleRemove(cartItemId);
        return;
    }
    await updateItem({productId : cartItemId , quantity : newQuantity});
    
    const updated = await getCart();
    setCart(updated);
}
return(
    <div className="min-h-screen px-10 py-10">
        <h1 className="text-3xl font-bold text-yellow-400 tracking-widest mb-10 text-center">MY CART</h1>
        <div className='flex flex-col gap-6'>
            {prodDetails.map((item)=>
           
           <div className={`flex items-center border ${theme === 'dark' ? 'border-white/10' : 'border-black/10'} gap-6 rounded-2xl p-5 hover:shadow-[0_0_20px_rgba(255,215,0,0.2)] transition-all duration-300`} key={item._id}>
                <img className="w-24 h-24 object-cover rounded-xl" src={item.image} alt="product"/>
                <p className="text-lg font-semibold">{item.name}</p>
                <p className="text-yellow-400 font-bold">₹{item.price}</p>
                
                <button className={`w-8 h-8 border ${theme === 'dark' ? 'border-white/20 text-white' : 'border-black/20 text-black'} rounded-md flex items-center justify-center hover:border-yellow-400 transition-all`} onClick={()=> handleUpdate(item.cartItemId,item.quantity - 1)}>-</button>
                <span className="font-bold" >{item.quantity}</span>
                
                <button className={`w-8 h-8 border ${theme === 'dark' ? 'border-white/20 text-white' : 'border-black/20 text-black'} rounded-md flex items-center justify-center hover:border-yellow-400 transition-all`} onClick={() => handleUpdate(item.cartItemId,item.quantity + 1)}>+</button>
                
                <button className="ml-auto text-red-400 hover:text-yellow-400 text-sm transition-all" onClick={()=> handleRemove(item.cartItemId)}>REMOVE</button>
            </div>
            )}
            <div className="flex justify-end mt-10">
                <div className = {`${theme === 'dark' ?  ' border border-white/10' : 'border border-black/10'} flex flex-col gap-4 w-80  rounded-2xl p-6`}>
                    <div className ="flex justify-between items-center">
                     <p >Total:</p>
                     <p>₹{prodDetails.reduce((total,item) =>total +(item.price * item.quantity), 0)}</p>
                     
               </div>
               <button className="mt-6 bg-yellow-400 text-black font-bold py-3 rounded-lg tracking-widest hover:shadow-[0_0_20px_rgba(255,255,255,0.4)] transition-all duration-200">Checkout</button>
                </div>
            </div>
            
        </div>
    </div>
);
}
export default CartPage;
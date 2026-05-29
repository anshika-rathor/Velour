import {useState,useEffect} from 'react';
 import {getCart, removeItem, updateItem }from '../services/cartService';
 const {cart,setCart} =useState(null);
 const {loading,setLoading} = useState(true);
 useEffect (()=>{
    async function fetchCart(){
        const cart = await getCart();
        setCart(cart);
        setLoading(false);

    }
    fetchCart();
 },[]);
 if(loading){
    return(
        <p  className ="text-white text-center mt-10">Loading...</p>
    );
    if(!cart || cart.products.length === 0){
        return(
            <p className="text-white/50 text-center mt-10">Your cart is empty.</p>
        );
    }
    return(
        <div className ="bg-black min-h-screen px-10 py-10 text-white">
            <h1 className="text-3xl font-bold text-yellow-400 tracking-widest mb-10 text-center">MY CART</h1>
            <div className='flex flex-col gap-6'> // items container
              {cart.products.map((item)=>
                <div className ="flex items-center border border-white/10 gap-6 rounded-2xl p-5  hover:shadow-[0_0_20px_rgba(255,215,0,0.2)] transition-all duration-300">
                    <img className = "w-24 h-24 object-cover rounded-xl " src="https://via.placeholder.com/100" alt ="product" ></img>
                    <p className="text-lg font-semibold">{item.productsId}</p>
                    <p className="text-yellow-400 font-bold ">₹{items.price}</p>
                </div>
            )}
            </div>
        </div>
    );
    
 }
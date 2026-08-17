import {getProductsById} from '../services/productService';
import {useState, useEffect} from 'react';
import { useTheme } from "../context/ThemeContext";
import { useNavigate } from 'react-router-dom';
import {getCart,updateItem , removeItem} from '../services/cartService';

function Checkout(){

    const {theme} = useTheme();
    const navigate = useNavigate();
    const [cart , setCart] = useState(null);
    const [prodDetails,setProdDetails] = useState([]);

    useEffect(()=>{
        async function getCartdata(){
            const cart = await getCart();
            console.log(cart);
            setCart(cart);
        }
        getCartdata();
    },[]);

    useEffect(()=>{
        async function fetchAll(){
            if(cart && cart.products.length > 0){
               const prodDetails = await Promise.all( 
                cart.products.map(item => getProductsById(item.productId))
            );
             const combined = prodDetails.map((product , index)=>({
                ...product,quantity: cart.products[index].quantity,cartItemId:cart.products[index]._id
             }));
               setProdDetails(combined);
            }
        }
        fetchAll();
    },[cart]);

        async function handleRemove(productId){
            await removeItem({productId});
            const updated = await getCart();
            setCart(updated);
        }

        async function handleUpdate(cartItemId , newQuantity){
        if(newQuantity<= 0){
            await handleRemove(cartItemId);
            return;
        }
        await updateItem({productId : cartItemId , quantity : newQuantity});
        const updated = await getCart();
        setCart(updated);
    }

    return(
        <div className = "min-h-screen px-10 py-10">
         <h1 className = "text-3xl font-bold tracking-widest text-center text-yellow-400 mb-10">CHECKOUT</h1>
        <div className = "flex flex-col gap-6">
           {prodDetails.map((item)=>
            <div className={`flex items-center border ${theme === 'dark' ? 'border-white/20 text-white' : 'border-black/20 text-black'} gap-6 p-5 rounded-2xl hover:shadow-[0_0_20px_rgba(255,215,0,0.2)] transition-all duration-300`} key = {item._id}>
                <img className = "w-20 h-20 object-cover" src = {item.image}
                alt = "products" />
                <p className='font-semibold text-lg'>{item.name}</p>
                <p className = "text-yellow-400 font-bold">₹{item.price}</p>
                
                <button className = {`w-8 h-8 border ${theme === 'dark'? 'border-white/20 text-white' : 'border-black/20 text-black'} items-center justify-center rounded-md flex hover:border-yellow-400 transition-all`} onClick={() => handleUpdate(item.cartItemId, item.quantity - 1)}>-</button>
                <span className = "font-bold">{item.quantity}</span>

                <button className = {`w-8 h-8 border ${theme === 'dark'? 'border-white/20 text-white' : 'border-black/20 text-black'} items-center justify-center rounded-md flex hover:border-yellow-400 transition-all`} onClick = {() => handleUpdate(item.cartItemId, item.quantity +1)}>+</button>
               
               <button className='text-sm text-red-400 ml-auto hover:border-yellow-400 transition-all' onClick={()=> handleRemove(item.cartItemId)}>REMOVE</button>

            </div>
            )} 
            <div className='justify-end flex mt-10'>
                <div className = {`${theme === 'dark' ?  'border border-white/10' : 'border border-black/10'} flex justify-between flex-col gap-4 w-80  rounded-2xl p-6 `}>
                  <p className='font-bold text-mid'>Price Details</p>
                  <div className='flex justify-between '>
                    <p>Price </p>
                    <p>₹{prodDetails.reduce((total,item) => total+(item.price * item.quantity),0)}</p>
                  </div>
                  <div className='flex justify-between'>
                    <p>Delivery Fee</p>
                    <p>FREE</p>
                  </div>
                  <div className='flex justify-between'>
                    <p>Platform Fee</p>
                    <p>FREE</p>
                  </div>
                  <div className='flex justify-between border-t pt-4'>
                    <p className='font-bold text-lg'>Total</p>
                    <p>₹{prodDetails.reduce((total,item) => total+(item.price * item.quantity),0)}</p>
                   
                  </div>
                   <button className='w-full text-2xl py-3 bg-yellow-400 border-black font-bold rounded-lg tracking-widest hover:bg-yellow-400 hover:shadow-[0_0_20px_rgba(255,255,255,0.4)] transition-all duration-200'>Place Order</button>
                </div>
            </div>
        </div>

    </div>
        
    )
}

export default Checkout;
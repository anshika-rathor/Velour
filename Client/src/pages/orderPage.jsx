import { useState , useEffect } from "react";
import {useTheme} from "../context/ThemeContext";
import { getOrders} from "../services/orderService";
import {getProductsById} from "../services/productService";

function OrderPage(){
const [orders,setOrders] = useState([]);
const [loading,setLoading] = useState(true);
const [prodDetails,setProdDetails] = useState([]);

const {theme} = useTheme();

useEffect(()=>{
    async function fetchOrders(){
        const data = await getOrders();
        setOrders(data);
        setLoading(false);
    }
    fetchOrders();
},[]);

    if(loading){
        return(
            <p className="text-center mt-10">Loading...</p>
        );
    }
    if(orders.length===0){
        return(
            <p className={`${theme === 'dark' ? 'text-white/50' : 'text-black/50'} text-center justify-center text-xl`}>You have not ordered anything Yet</p>
        );
    }

    return(
        <div className="min-h-screen px-10 py-10">
            <h1 className = "text-3xl font-bold tracking-widest text-center text-yellow-400 mb-10">MY ORDERS</h1>
        </div>
    );

}
export default OrderPage;

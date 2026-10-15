import {useState,useEffect} from "react";
import {useTheme} from "../context/ThemeContext";
import {getWishlist , removeProduct} from "../services/wishlistService";
import {getProductsById} from "../services/productService";

function WishListPage(){
    const [wishList,setWishList] = useState(null);
    const [loading,setLoading] = useState(true);
    const {theme} = useTheme();
    const [prodDetail,setProdDetail] = useState([]);
    useEffect(()=>{
        async function FetchWish(){
            const fetch = await getWishlist();
            setWishList(fetch);
            setLoading(false);
        }
        FetchWish();
    },[]);
    useEffect(() => {
    async function fetchDetails(){
        if(!wishList || wishList.length === 0) return;
        const ids = wishList[0].products;
        const details = await Promise.all(ids.map(id => getProductsById(id)));
        setProdDetail(details);
    }
    fetchDetails();
}, [wishList]);

    async function handleRemove(productId){
        console.log('removing', productId);
        await removeProduct({productId});
        const updated = await getWishlist();
        setWishList(updated);
        
    }
    if(loading){
        return(
            <p>Loading...</p>
        );
    }
    if(!wishList || wishList.length===0){
        return(
            <p className="flex flex-col items-center justify-center text-2xl my-2">Your WishList is Empty.</p>
        );
    }

    

    return(
        <div className="min-h-screen px-10 py-10">
            <h1 className="text-3xl font-bold tracking-widest text-yellow-400 mb-10 text-center">MY WISHLIST</h1>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-8">
                {prodDetail.map((product)=>(
                    <div className={`${theme === 'dark' ? 'border-white/10' : 'border-black/10'} border rounded-2xl overflow-hidden p-5 flex flex-col gap-3 hover:shadow-[0_0_25px_rgba(255,215,0,0.3)] transition-all duration-300`} key={product._id}>
                        <img  className=" w-full h-48 object-cover rounded-xl bg-white/5 " 
                        src={product.image}/>
                        <p>{product.name}</p>
                        <button className={`mt-auto w-full py-2 rounded-lg text-sm font-bold tracking-widest border transition-all duration-200 ${theme === 'dark' ? 'border-white/20 text-white/60 hover:border-red-400 hover:text-red-400' : 'border-black/20 text-black/60 hover:border-red-400 hover:text-red-400'}`}  onClick={() => handleRemove(product._id)}>Remove</button>
                    </div>
                ))}

            </div>
        </div>
    );

}
export default  WishListPage;
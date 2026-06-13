import { useState } from "react";
import { useEffect } from "react";
import {useTheme} from "../context/ThemeContext";
import getOrders from "../services/getOrders";
import getProductsById from "../services/productService";

function OrderPage(){
const [orders,setOrders] = useState([]);
const [loading,setLoading] = useState(true);
const [prodDetails,setProdDetails] = useState([]);

const {theme} = useTheme();
}
export default OrderPage;

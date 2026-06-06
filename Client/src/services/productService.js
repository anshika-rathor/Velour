import api from '../api';

export const getAllProducts = async () =>{
    const res = await api.get('/products');
    return res.data;
}

export const getProductsById = async (id) =>{
    const res = await api.get(`/products/${id}`);
    return res.data;
}

export const createProductById = async (data) =>{
    const res = await api.post (`/products`,data);
    return res.data;
    
}

export const updateProduct = async (id,data)=>{
    const res = await api.put(`/products/${id}`,data);
    return res.data;
}

export const deleteProduct = async (id) =>{
    const res = await api.delete(`/products/${id}`);
    return res.data;
}
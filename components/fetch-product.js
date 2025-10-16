// get all products API
export const fetchAllProducts = async (skip,limit)=>{
    try{
        const response = await fetch(`https://dummyjson.com/products?limit=${limit}&skip=${skip}`);

        if(response.ok){
            const data = await response.json();
            return data;
        } else {
            throw new Error("404 Error");
        }
    } catch(error){
        console.log("error:",error);
    }
}
// get search products API
export const fetchSearchProduct = async(search_text,skip,limit) =>{
    try{
        const response = await fetch(`https://dummyjson.com/products/search?q=${search_text}&skip=${skip}&limit=${limit}`);

        if(response.ok){
            const data = await response.json();
            return data;
        } else {
            throw new Error("bad gateway");
        }
    } catch(error){
        console.log(error);
    }
}
// get category list API
export const fetchCategoryList = async ()=>{
    try{
        const response = await fetch("https://dummyjson.com/products/category-list");

        if(response.ok){
            const data = await response.json();
            return data;
        } else{
            throw new Error("Bad Request");
        }

    }catch(error){
        console.log(error);
    }
}
// get products by category
export const fetchProductByCategory = async (categoryTag)=>{
    try{
        const response = await fetch(`https://dummyjson.com/products/category/${categoryTag}`);

        if(response.ok){
            const data = await response.json();
            return data;
        } else {
            throw new Error("Bad Gateway");
        }

    } catch(error){
        console.log(error);
    }
}
// get single product
export const fetchSingleProduct = async (id)=>{
    try{
        const response = await fetch(`https://dummyjson.com/products/${id}`);

        if(response.ok){
            const data = await response.json();
            return data;
        }
    } catch(error){
        console.log(error);
    }
}
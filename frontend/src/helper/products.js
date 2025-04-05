import axios from 'axios'

export const genSaleProducts = async(num)=>{
    let res = await axios.get(`https://urbancart-backend-5jg9.onrender.com/api/allProducts`, {
        withCredentials: true, // Allows sending cookies and authentication headers
      });
    let products = await res.data;
    products = products.slice(0,num);
    return products;
}

export const genProductDetails = async(productId='673f57c7a60ec00750345db8')=>{
    let res = await axios.get(`https://urbancart-backend-5jg9.onrender.com/api/products/${productId}`, {
        withCredentials: true, // Allows sending cookies and authentication headers
      });
    let products = await res.data;
    return products;
}

export const genProducts = async(category="mobile-accessories",num)=>{
    let res = await axios.get(`https://urbancart-backend-5jg9.onrender.com/api/allProducts`, {
        withCredentials: true, // Allows sending cookies and authentication headers
      });
    let data = await res.data;
    let products = data.filter((product)=>{
        return product.category==category;
    });
    return products;
}

export const genCategories = async(num)=>{
    let res = await axios.get('https://urbancart-backend-5jg9.onrender.com/api/allProducts', {
        withCredentials: true, // Allows sending cookies and authentication headers
      });
    let products = await res.data;
    let categories = [];
    for(let prod of products){
        let existingCat = categories.find((categ)=>{
            return categ.name == prod.category;
        });
        if(!existingCat){
            categories.push({"name":prod.category,"image":prod.images[0]});
        }
    }
    if(num) return categories.slice(0,num);
    else return categories;
}
     
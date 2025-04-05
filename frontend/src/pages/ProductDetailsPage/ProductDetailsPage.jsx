import React, { useState,useEffect } from 'react'
import axios from 'axios'
import "./ProductDetailsPage.css"
import Layout from '../../components/Layout/Layout'
import { useLocation,useNavigate,useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import Loader from '../../components/Loader/Loader';

import Rating from '@mui/material/Rating';
import { genProductDetails } from '../../helper/products';

const ProductDetailsPage = () => {
    const navigate = useNavigate();
    // let {state} = useLocation();
    // let product = state;
    const params = useParams();
    const [product,setProduct]=useState(null);
    const [currImage,setCurrImage] = useState(null);
    const [quantitySelected,setQuantitySelected] = useState(1);

    useEffect(()=>{
        async function getData(){
            let productId = params.productId;
            let data = await genProductDetails(productId);
            setProduct(data);
            setCurrImage(data.images[0]);
        }
        getData();
    },[params.productId])

    const handleQuantitySelected = (num)=>{
        setQuantitySelected((currCount)=>{
            if((currCount==1 && num==-1)||(currCount==product.minimumOrderQuantity && num==1)){
                return currCount;
            }
            else{
                currCount+=num;
                return currCount;
            }
        })
    }

    const handleBuyButton = async()=>{
        try {
            let response = await axios.get(`http://localhost:3000/api/addToCart?productId=${product._id}&quantity=${quantitySelected}`,{withCredentials:true});
            // console.log(response.data.message); 
            toast('Item added to Cart!');
            navigate('/cart');
        } catch (error) {
            console.error("Error adding to cart:", error.response?.data || error.message);
        }
    }

    if (!product) {
        return(
            <Loader/>
        ) 
    }

  return (
    <Layout title='UrbanCarts-Product Specifications'>
        <div className='details-container'>
            <div className="prod-details-images">
                <div className="details-side-images">
                    {
                        product.images.map((image)=>{
                            return (
                                <div className="prod-details-image" onClick={()=>{setCurrImage(image)}}
                                    style={currImage===image?{border:"2px solid red",borderRadius:"10px"}:null}>
                                    <img src={image} alt=""/>
                                </div>
                            )
                        })
                    }
                </div>
                <div className="details-image-display">
                    <img src={currImage} alt="" />
                </div>
            </div>
            <div className="prod-info">
                <h2 className='prod-info-title'>{product.title}</h2>
                <div className="prod-info-rateAvail">
                    <Rating name="read-only" value={product.rating} readOnly />
                    <span className='prod-info-availability'>{product.availabilityStatus}</span>
                </div>
                <p>
                    <span className='prod-info-price'>$ {product.price}</span>
                    <span className='prod-info-discount'>({product.discountPercentage}% OFF)</span>
                </p>
                <p className='prod-info-desc'>{product.description}</p>
                <hr className='prod-info-hr'/>
                <div className="prod-info-actions">
                    <div className="quantitySelect">
                        <div className="manQuant" onClick={()=>{handleQuantitySelected(-1)}}>-</div>
                        <div className="quantityCount">{quantitySelected}</div>
                        <div className="manQuant" onClick={()=>{handleQuantitySelected(1)}}>+</div>
                    </div>
                    <div className="buy-now" onClick={handleBuyButton}>Add To Cart</div>
                </div>

            </div>
        </div>
    </Layout>
  )
}
  


export default ProductDetailsPage

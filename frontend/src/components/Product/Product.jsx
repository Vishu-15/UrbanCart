import React, { useState,useEffect } from 'react'
import "./Product.css"

import Rating from '@mui/material/Rating';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Link } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const Product = ({product,showWishIcon=true}) => {
    const [currUser,setCurrUser] = useState(null);

    async function getUser(){
      try{
        let res = await axios.get("https://urbancart-backend-5jg9.onrender.com/api/getUser");
        setCurrUser({...res.data.user});
      }
      catch(e){
        console.log(e);
      }
    }

    useEffect(()=>{
      getUser();
    },[]);

    const handleLikeBtn =async (product)=>{
        try{
          let res = await axios.get(`https://urbancart-backend-5jg9.onrender.com/api/updateWishlist?productId=${product._id}`);
          toast('Wishlist Updated!');
          // console.log(res.data);
          getUser();
        }
        catch(e){
          console.log(e);
          toast('Failed to update Wishlist!');
        }
    }

  return (
    <div className='product'>
      <Link to={`/products/${product._id}`}>
        <div className="prod-image">
          <img src={product.images[0]} alt="" />
        </div>
      </Link>
        <div className="prod-name">{product.title}</div>
        <div className="prod-price">Rs. {product.price}</div>
        <Rating className="prod-rating" name="read-only" value={product.rating} readOnly />
        <div className="prod-discount">-{product.discountPercentage}%</div>
      {showWishIcon && currUser?<div className="prod-wishlist" onClick={()=>{handleLikeBtn(product)}}>{currUser.wishlist.filter((item)=> item._id == product._id).length>0?<FavoriteIcon/>:<FavoriteBorderIcon/>}</div>:""}
      
    </div>
  )
}

export default Product

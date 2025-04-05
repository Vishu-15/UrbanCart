import React, { useEffect, useState } from 'react'
import "./ProductsPage.css"
import Layout from '../../components/Layout/Layout.jsx'
import ProductWrap from '../../components/ProductWrap/ProductWrap.jsx'
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import {genProducts,genCategories} from '../../helper/products.js'
import Loader from '../../components/Loader/Loader.jsx';

const ProductsPage = () => {

  const [products,setProducts] = useState([]);
  const [allCategories,setAllCategories] = useState([]);
  const [category,setCategory] = useState("mobile-accessories");

  useEffect(()=>{
    async function getData(){
      let data = await genProducts(category);
      let data2 = await genCategories(undefined);
      // console.log(data2);
      setProducts(data);
      setAllCategories(data2);
    }
    getData();
  },[category]);

  if (products.length==0) {
    return (
      <Loader/>
    );
  }

  return (
    <Layout title="UrbanCarts-Products" >
      <div className="products-page">
        {/* <select 
          name="category" 
          id="category-select"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        ></select> */}

        <Box sx={{ minWidth: 120 }} className="category-select">
          <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Category</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={category}
            label="Category"
            onChange={(e) => setCategory(e.target.value)}
          >
            {
              allCategories.map((categoryItem)=>{
                return <MenuItem key={categoryItem.idx} value={categoryItem.name}>{categoryItem.name}</MenuItem>
              })
            }
          </Select>
          </FormControl>
        </Box>

        <ProductWrap products={products} categoryName={category.toUpperCase()} length={products.length}/>
      </div>
    </Layout>
  )
}

export default ProductsPage
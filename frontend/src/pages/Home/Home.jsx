import React, { useEffect, useState } from 'react'
import "./Home.css"
import Layout from '../../components/Layout/Layout.jsx'

import HomeBanner from '../../components/HomeBanner/HomeBanner.jsx'
import Services from '../../components/Services/Services.jsx'

import {genProducts,genSaleProducts,genCategories} from '../../helper/products.js'
import Product from '../../components/Product/Product.jsx'
import HomeSubLayout from '../../components/HomeSubLayout/HomeSubLayout.jsx'
import Category from '../../components/Category/Category.jsx'
import ProductWrap from '../../components/ProductWrap/ProductWrap.jsx'
import { useUser } from '../../context/user.jsx'


const Home = () => {

  const [saleProducts,setSaleProducts] = useState([]);
  const [products,setProducts] = useState([]);
  const [categories,setCategories] = useState([]);
  const [user,setUser] = useUser();

  useEffect(()=>{
    async function getData(){
      let data = await genSaleProducts(15);
      let data1 = await genProducts(undefined,8);
      let data2 = await genCategories(15);
      setSaleProducts(data);
      setProducts(data1);
      setCategories(data2);
      // console.log(user);
    }
    getData();
  },[]);


  return (
    <Layout title="UrbanCarts">
      <HomeBanner/> 
      <HomeSubLayout heading="Flagship Sale" prodCount={15}>
          {saleProducts.map((prod)=>{
            return <Product key={prod.id} product={prod} />
          })}
      </HomeSubLayout>
      <hr />
      <HomeSubLayout heading="Trending Categories" prodCount={15}>
          {categories.map((category,idx)=>{
            return <Category key={idx} category={category} />
          })}
      </HomeSubLayout>
      <hr />
      <ProductWrap products={products} categoryName="View Our Products" length={8}/>
      <hr />
      <Services/>
    </Layout>
  )
}

export default Home

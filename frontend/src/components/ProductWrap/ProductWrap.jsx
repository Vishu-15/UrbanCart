import React from 'react'
import "./ProductWrap.css"
import Product from '../Product/Product'

const ProductWrap = ({products,categoryName,length}) => {
  return (
    <div className='products-wrap'>
      <div className="products-category">{categoryName}</div>
      <div className="products">
        {
            products.map((product,idx)=>{
                if(idx<length){
                    return <Product product={product}/>
                }
            })
        }
      </div>
    </div>
  )
}

export default ProductWrap

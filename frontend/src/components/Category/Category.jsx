import React from 'react'
import "./Category.css"

const Category = ({category}) => {
  return (
    <div className='category'>
        <div className="category-image">
            <img src={category.image} alt="" />
        </div>
        <div className="category-name">{category.name}</div>
    </div>
  )
}

export default Category

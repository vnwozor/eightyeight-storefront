import React from 'react'
import './ProductItem.css'
import { assets } from '../../Assets/all_products.js'
import { Link } from 'react-router-dom'



export const ProductItem = ({id,image,height,name,price,outOfStock}) => {

    const formatCurrency = (amount) => {
        return `${amount.toLocaleString()}`
    }

    return (
        <Link to={`/Product/${id}`} className='product-div'>
        

        
            <div className='img-div'>
                <img src={image} />
            </div>

            <div>
                <p className='product-name'>
                    {name}
                </p>

                { outOfStock 
                ? <div className='sold-stamp-div'>
                    <p className='sold-stamp'>sold out</p>
                </div> 
                : <p className='product-price'>
                    
                    <img src={assets.naira_icon} className='naira-icon'  />
                    {formatCurrency(price)}
                </p>
                }
            </div>
            
        </Link>
    )
}
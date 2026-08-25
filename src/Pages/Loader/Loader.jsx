import React from 'react'
import "./Loader.css"
import { assets } from '../../Assets/all_products'

export const Loader = () => {
  return (
    <div className='loader-div'>

        <img src={assets.logo} className='loader-img'/>

    </div>
  )
}

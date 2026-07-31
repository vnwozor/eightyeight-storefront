import React from 'react'
import { Footer } from '../Components/Footer/Footer'
import { ShirtSingle } from './Single pages/ShirtSingle'
import { TrouserSingle } from './Single pages/TrouserSingle'
import { ShoeSingle } from './Single pages/ShoeSingle'
import { AccessorySingle } from './Single pages/AccessorySingle'

export const Allproducts = () => {
  return (
    <>
        <div>


        
          <ShirtSingle/>

          <TrouserSingle/>

          <ShoeSingle/>

          <AccessorySingle/>





        </div>
        
        <Footer/>
    </>
  )
}

import React, { useContext, useEffect, useState } from 'react'
import './OpenMenu.css'
import { assets } from '../../Assets/all_products'
import { Link, NavLink } from 'react-router-dom'
import { RightSide } from './RightSide.jsx'
import { ShopContext } from '../../Context/ShopContext.jsx'

export const OpenMenu = ({onMenu, setOnMenu}) => {

    useEffect(() => {
        if(onMenu) {
            document.body.style.overflow = 'hidden'
            document.body.style.paddingRight = '8px'
        } else {
            document.body.style.overflow = 'auto'
            document.body.style.paddingRight = '0px'
        }

        return () => {
            document.body.style.overflow = 'auto'
            document.body.style.paddingRight = '0px'
        }
    },[onMenu])


    const {getCartCount} = useContext(ShopContext)


    const [shopCate, setShopCate] = useState(false);




  return (
    <div className='main-div'>
        <div className={`open-menu ${onMenu ? 'menu-open' : '' }`}>
        
            
            <img src={assets.close_icon} onClick={() => setOnMenu(!onMenu)} className='close-btn' alt="close icon" />


            <NavLink  onClick={() => setOnMenu(!onMenu)} to='/' className='open-menu-div'>
                <div className='menu'>
                    <div>
                        HOME
                        <hr className='menu-line' />
                    </div>
                </div>
            </NavLink>

            <div onClick={() => setShopCate(!shopCate)}  className='open-menu-div'>
                <div className='menu'>
                    <div>
                        SHOP
                        <hr className='menu-line' />
                    </div>
                    <div className={`sub-menu ${shopCate ? 'open' : ''}`}>
                        {'>'}
                    </div>
                </div>

                <div className={`category-div ${shopCate ? 'open' : ''}`}>
                    
                    
                    <Link onClick={() => setOnMenu(!onMenu)} className='shirt' to='/Shirts'>

                    
                        SHIRTS
                        <hr className='cate-line' />
                    
                    
                    </Link>
                    


                    <Link onClick={() => setOnMenu(!onMenu)} to='/Trousers' className='cate'>
                        TROUSERS
                        <hr className='cate-line' />
                    </Link>

                    <Link onClick={() => setOnMenu(!onMenu)} to='/Accessories' className='cate'>
                        ACCESSORIES
                        <hr className='cate-line' />
                    </Link>

                    <Link onClick={() => setOnMenu(!onMenu)} to='/Shoes' className='cate'>
                        SHOES
                        <hr className='cate-line' />
                    </Link>

                

                </div>

                
                
            </div>

            <NavLink onClick={() => setOnMenu(!onMenu)} to='/All-Products' className='open-menu-div'>
                <div className='menu'>
                    <div>
                        ALL PRODUCTS
                        <hr className='menu-line' />
                    </div>
                </div>
            </NavLink>


            <NavLink onClick={() => setOnMenu(!onMenu)} to='/Cart' className='open-menu-div'>
                <div className='menu'>
                    <div>
                        <div className='cartcount-nav'>
                            <p>CART</p>
                            {getCartCount() > 0 && (
                                <div className='cartnavcount'>{getCartCount()}</div>
                            )}
                        </div>
                        <hr className='menu-line' />
                    </div>
                </div>
            </NavLink>

            <NavLink onClick={() => setOnMenu(!onMenu)} to='/Track-Order' className='open-menu-div'>
                <div className='menu'>
                    <div>
                        TRACK ORDER
                        <hr className='menu-line' />
                    </div>
                </div>
            </NavLink>

            {/* <div className='open-menu-div'>
                <div className='menu'>
                    <div>
                        PROFILE
                        <hr className='menu-line' />
                    </div>
                </div>
            </div> */}

        
            

        </div>

        

        <RightSide onMenu={onMenu} setOnMenu={setOnMenu} />

        

    </div>
  )
}

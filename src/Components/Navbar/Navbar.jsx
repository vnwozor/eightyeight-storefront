import React, { useState, useContext, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Categories } from '../../Pages/Categories.jsx'
import { CartPage } from '../../Pages/CartPage.jsx'
import './Navbar.css'
import { assets } from '../../Assets/all_products.js'
import { OpenMenu } from '../OpenMenu/OpenMenu.jsx'
import { ShopContext } from '../../Context/ShopContext.jsx'

export const Navbar = () => {


	const {getCartCount} = useContext(ShopContext)


  	const [onMenu, setOnMenu] = useState(false)

	


	return (

		<div className='navbar'>

		

			<div>

				<div  onClick={() => setOnMenu(!onMenu)} className='cartcount-di'>
					<img  src={assets.menu_bar} className='menu-bar-icon' />
					{getCartCount() > 0 && (
						<div className='cartccount'>{getCartCount()}</div>
					)}
				</div>
			
				
		
				<OpenMenu onMenu={onMenu} setOnMenu={setOnMenu}/>


				<div className='main-menu'>
					<NavLink to='/' className='menu-nav'>
						<p>HOME</p>
						<hr  className='nav-line' />
					</NavLink>


					<div className='shop-wrapper'>

						<div  className='shop-nav'>
							<p>SHOP</p>
							<hr className='nav-line' />
						</div>
						
						
						<div className='shop-hover'>

							<Link  to='/Shirts' className='cate-main'>
								<p>
									SHIRTS
								</p>
								<hr  className='shirt-line' />
							</Link>

							<Link  to='/Trousers'  className='cate-main'>
								<p>
									TROUSERS
								</p>
								<hr className='shirt-line' />
							</Link>

							<Link to='/Accessories' className='cate-main'>
								<p>
									ACCESSORIES
								</p>
								<hr className='shirt-line' />
							</Link>

							<Link className='cate-main'>
								<p>
									SHOES
								</p>
								<hr className='shirt-line' />
							</Link>
						</div>
					</div>


					<NavLink to='/All-Products' className='menu-nav'>
						<p>ALL PRODUCT</p>
						<hr className='nav-line' />
					</NavLink>
					
					
					<NavLink  to='/Cart' className='menu-nav'>
						<div className='cartcount-div'>
							<p>CART</p>
							<hr className='nav-line' />

							{getCartCount() > 0 && (
								<div className='cartcount'>{getCartCount()}</div>
							)}
						</div>
					</NavLink>
					
					<NavLink  to='/Track-Order' className='menu-nav'>
						<p>TRACK ORDER</p>
						<hr className='nav-line' />
					</NavLink>
				</div>
			
			</div>
			



			<NavLink to='/'>
				<img src={assets.logo} className='logo' alt="E8 logo" />
			</NavLink>
			
		
		

			

		</div>
	)
}

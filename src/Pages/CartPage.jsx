import './CartPage.css'
import React, { useContext } from 'react'
import { ShopContext } from '../Context/ShopContext'
import { Title } from '../Components/Section/Section Title/Title';
import { assets } from '../Assets/all_products';
import { CartTotal } from '../Components/CartTotal/CartTotal.jsx';
import { Footer } from '../Components/Footer/Footer.jsx';

const backendUrl = import.meta.env.VITE_BACKEND_URL

export const CartPage = () => {


    const { products, cartItem, removeFromCart, updateQuantity, getTotalCart, navigate } = useContext(ShopContext)

    const { subtotal, deliveryFee, total } = getTotalCart()

    const displayData = cartItem.filter( item => item.quantity > 0);

    const formatCurrency = (amount) => {
        return `${amount.toLocaleString()}`
    }

    

    return (
        <>
            <div className='cart-main'>
                
                <div className='title-div'>
                    <Title title={'CART'}/>
                </div>


                <div className='cart-div'>

                    {
                        displayData.length === 0 ? (
                            <p className='cart-empty-msg'>Your cart is empty</p>
                        ) : (
                            <>
                                <div className='cart-heading-info'>
                                    
                                    <p className='product-p'>Product Name</p>
                                    <p>Quantity</p>
                                    <p>Remove</p>
                                    
                                </div>
                            

                                {
                                    displayData.map((item, index) => {

                                        const productData = products.find((product) => product._id === item.id)

                                        if (!productData) return null

                                        const priceTimesQuantity = () => {
                                            return productData.price * item.quantity
                                        }

                                        return (
                                            <div className='display-main' key={index}>
                                                <div className='cart-product-div' id={item.id}>

                                                    
                                                    <div className='cart-image-div'>
                                                        <img className='cart-image' src={productData.images[0]}  />
                                                    </div>
                                                    

                                                    <div className='cart-info'>

                                                        <p className='cart-name'>
                                                            {productData.name}
                                                        </p>

                                                        <div className='cart-price'>
                                                            <div>{item.size}</div>
                                                            <p>
                                                                <img src={assets.naira_icon} className='naira-icon' />
                                                                {formatCurrency(priceTimesQuantity())}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    
                                                </div>

                                                <input onChange={(e) => updateQuantity(item.id,item.size,Number(e.target.value) )} className='quantity-input' type="number" min={1}  value={item.quantity}/>
                                                <img onClick={() => removeFromCart(item.id, item.size)} className='remove-btn' src={assets.close_icon}  />
                                            </div>
                                        )
                                    })
                                }

                                <div>
                                    <CartTotal/>
                                    <div>
                                        
                                        <button onClick={() => navigate('/Place-Order')} className='proceed-btn'>
                                            Procced To Checkout
                                        </button>
                                
                                    </div>
                                </div>
                            </>
                        )
                    }

                </div>


                

            </div>

            <Footer/>
        </>
    )
}
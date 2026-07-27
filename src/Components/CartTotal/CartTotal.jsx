import React, { useContext } from 'react'
import './CartTotal.css'
import { Title } from '../Section/Section Title/Title'
import { assets } from '../../Assets/all_products'
import { ShopContext } from '../../Context/ShopContext'

export const CartTotal = () => {

    const {getTotalCart, navigate } = useContext(ShopContext)
    
    const { subtotal, deliveryFee, total } = getTotalCart()

    const formatCurrency = (amount) => {
        return `${amount.toLocaleString()}`
    }

    const formatDate = (date) => {
        const day = date.getDate()
        const month = date.toLocaleString('en-US', { month: 'long' })
        const year = date.getFullYear()

        const getOrdinal = (n) => {
            if (n > 3 && n < 21) return 'th'
            switch (n % 10) {
                case 1: return 'st'
                case 2: return 'nd'
                case 3: return 'rd'
                default: return 'th'
            }
        }

        return `${day}${getOrdinal(day)} ${month}, ${year}`
    }

    return (
        <div className='cart-total-main'>
            <Title title={'Cart Total'}/>

            <div className='cart-total-div'>
                <div className='cart-total-sub-total'>
                    <p>Sub Total:</p>
                    <div>
                        <img src={assets.naira_icon} className='naira-icon'/>
                        {formatCurrency(subtotal)}
                    </div>
                </div>

                <div className='cart-total-sub'>
                    <p>Delivery Fee:</p>
                    <div>
                        <img src={assets.naira_icon} className='naira-icon'/>
                        {formatCurrency(deliveryFee)}
                    </div>
                </div>

                <div className='cart-total-sub'>
                    <p>Total:</p>
                    <div>
                        <img src={assets.naira_icon} className='naira-icon'/>
                        {formatCurrency(total)}
                    </div>
                </div>

                <div className='cart-total-sub'>
                    <p>Delivery Date:</p>
                    <div>
                        {formatDate(new Date())}
                    </div>
                </div>
            </div>
        </div>
    )
}
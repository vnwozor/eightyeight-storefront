import React, { useState, useEffect } from 'react'
import './OrderPage.css'
import axios from 'axios'
import { Title } from '../Components/Section/Section Title/Title'
import { assets } from '../Assets/all_products'
import { Footer } from '../Components/Footer/Footer'

const backendUrl = import.meta.env.VITE_BACKEND_URL

export const OrderPage = () => {

    const [orders, setOrders] = useState([])
    const [email, setEmail] = useState('')

    const fetchMyOrders = async () => {
        try {
            const savedIds = JSON.parse(localStorage.getItem('myOrderIds') || '[]');
            if (savedIds.length === 0) return;

            const results = await Promise.all(
                savedIds.map((id) => axios.get(`${backendUrl}/api/order/${id}`))
            );

            const foundOrders = results
                .filter((res) => res.data.success)
                .map((res) => res.data.order);

            setOrders(foundOrders);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchMyOrders();
    }, []);

    const searchByEmail = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${backendUrl}/api/order/by-email`, { email });
            if (response.data.success) {
                setOrders(response.data.orders);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <div className='orderpage-main'>

                <div className='track-div'>

                
                    <Title className="track-title" title={'TRACK ORDER'} />

                    <form onSubmit={searchByEmail} className='order-search-form'>
                        <p className='order-search-p'>Enter your email to find your orders</p>
                        <div>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className='order-search-input'
                            />
                            <button type="submit" className='order-search-btn'>Search</button>
                        </div>
                    </form>

                </div>

                {
                    orders.length === 0 ? (
                        <p>No orders found.</p>
                    ) : (
                        orders.map((order) => (
                            order.items.map((item, index) => (
                                <div key={`${order._id}-${index}`} className='orderpage-div'>

                                    <div className='orderpage-info'>

                                        <img className='orderpage-img' src={item.image || ''} alt="" />

                                        <div className='orderpage-des'>
                                            <p className='orderprod-name'>
                                                {item.name}
                                            </p>

                                            <div className='orderpage-details'>

                                                <div className='orderprod-size'>{item.size}</div>
                                                <p className='orderprod-quantity'>QTY:{item.quantity}</p>

                                                <div className='orderprod-price-div'>
                                                    <img className='naira-icon' src={assets.naira_icon} />
                                                    <p className='orderprod-price'>{item.price}</p>
                                                </div>
                                            </div>
                                            
                                            <p className='orderprod-date'>
                                                {new Date(order.date).toLocaleDateString('en-GB', {
                                                    day: 'numeric', month: 'long', year: 'numeric'
                                                })}
                                            </p>

                                        </div>
                                    </div>

                                    <div className='order-loc'>
                                        {order.status}
                                    </div>

                                </div>
                            ))
                        ))
                    )
                }

            </div>

            <Footer/>
        </>
    )
}
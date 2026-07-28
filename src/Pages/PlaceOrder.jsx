import React, { useContext, useState } from 'react'
import './PlaceOrder.css'
import { Title } from '../Components/Section/Section Title/Title'
import { CartTotal } from '../Components/CartTotal/CartTotal'
import { ShopContext } from '../Context/ShopContext'
import { toast } from 'react-toastify'
import { nigeriaLocations } from '../Data/NigeriaLoctions.js'

export const PlaceOrder = () => {

    const { placeOrder } = useContext(ShopContext)

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        street: '',
        city: '',
        state: '',
        country: 'Nigeria',
        phone: ''
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    // when state changes, reset city since the options depend on it
    const handleStateChange = (e) => {
        const newState = e.target.value
        setFormData((prev) => ({ ...prev, state: newState, city: '' }))
    }

    const getEstimatedDeliveryDate = () => {
        const date = new Date()
        date.setDate(date.getDate() + 3)
        return date.toLocaleDateString('en-GB', {
            day: 'numeric', month: 'long', year: 'numeric'
        })
    }

    const handlePlaceOrder = () => {

        const { firstName, lastName, email, street, city, state, country, phone } = formData

        if (!firstName || !lastName || !email || !street || !city || !state || !country || !phone) {
            toast.error('Please fill in all delivery details')
            return;
        }

        placeOrder({ ...formData, estimatedDelivery: getEstimatedDeliveryDate() })
    }

    const availableCities = formData.state ? nigeriaLocations[formData.state] || [] : []

    return (
        <div className='placeorder-main'>


            <div className='placeorder-div'>

                <Title title={'DELIVERY INFORMATION'} />

                <div className='placeorder-h'>

                    <div className='placeorder-input-div'>
                        <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} placeholder='First name' className='placeorder-input-small' />

                        <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} placeholder='Last name' className='placeorder-input-small' />
                    </div>

                    <input type="text" name="email" value={formData.email} onChange={handleChange} placeholder='Email Address' className='placeorder-input' />

                    <input type="text" name="street" value={formData.street} onChange={handleChange} placeholder='Street' className='placeorder-input' />

                    <div className='placeorder-input-div'>

                        <select name="state" value={formData.state} onChange={handleStateChange} className='placeorder-input-small'>
                            <option value="">Select State</option>
                            {Object.keys(nigeriaLocations).map((state) => (
                                <option key={state} value={state}>{state}</option>
                            ))}
                        </select>

                        <select name="city" value={formData.city} onChange={handleChange} className='placeorder-input-small' disabled={!formData.state}>
                            <option value="">Select City</option>
                            {availableCities.map((city) => (
                                <option key={city} value={city}>{city}</option>
                            ))}
                        </select>
                    </div>

                    <div className='placeorder-input-div'>
                        <input type="text" name="country" value={formData.country} onChange={handleChange} placeholder='Country' className='placeorder-input-small' readOnly />

                        <input type="text" name="phone" value={formData.phone} onChange={handleChange} placeholder='Phone Number' className='placeorder-input-small' />
                    </div>
                </div>

                <p className='estimated-delivery'>
                    Estimated Delivery: {getEstimatedDeliveryDate()}
                </p>

            </div>



            <div>

                <CartTotal state={formData.state} />

                <div>
                    <button onClick={handlePlaceOrder} className='proceed-btn'>
                        PLACE ORDER
                    </button>
                </div>

            </div>

        </div>
    )
}
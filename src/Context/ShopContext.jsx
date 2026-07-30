import React, { useEffect, useState } from 'react'
import { createContext } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

export const ShopContext = createContext()

const ShopContextProvider = ({children}) => {

    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const [products, setProducts] = useState([])
    const [cartItem, setCartItem] = useState(() => {
        const savedCart = localStorage.getItem('cartItem')
        return savedCart ? JSON.parse(savedCart) : []
    })

    useEffect(() => {
        localStorage.setItem('cartItem', JSON.stringify(cartItem))
    }, [cartItem])


    const [orders, setOrders] = useState([])   // holds placed orders (for Track-Order page)
    const [settings, setSettings] = useState({ abujaFee: 5000, outsideAbujaFee: 10000 })

    const navigate = useNavigate('')

    // fetch all products from the backend
    const getProductsData = async () => {
        try {
            const response = await axios.get(backendUrl + '/api/product/list')
            if (response.data.success) {
                setProducts(response.data.products)
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error('Could not load products')
        }
    }

    // fetch current delivery fee settings from the backend
    const getSettingsData = async () => {
        try {
            const response = await axios.get(backendUrl + '/api/settings/get')
            if (response.data.success) {
                setSettings(response.data.settings)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getProductsData()
        getSettingsData()
    }, [])

    const addToCart = (id,size,quantity) => {

        if(!size) {
            toast.error('Select Product Size')
            return;
        }
        let cartData = structuredClone(cartItem)

        const existingItem = cartData.find((item) => item.id === id && item.size === size)

        if (existingItem) {
            existingItem.quantity += quantity
        } else {
            cartData.push({id, size, quantity:quantity})
        }

        setCartItem(cartData)
        toast.success('Added To Cart')
    }


    const removeFromCart  = (id,size) => {

        const cartData = cartItem.filter ((item) => !(item.id === id && item.size === size))

        setCartItem(cartData)

        toast.info('Removed from cart')
    }


    const getCartCount = () => {
        if (cartItem.length === 0) {
            return null
        } else {  
            return cartItem.length ;  
        }   
    }

    const updateQuantity = (id, size, quantity) => {
        let cartData = structuredClone(cartItem);

        const existingItem = cartData.find(
            (item) => item.id === id && item.size === size
        );

        if (existingItem) {
            existingItem.quantity = quantity;
        }

        setCartItem(cartData);
    };

    const getTotalCart = (state) => {

        const subtotal = cartItem.reduce((sum, item) => {
            const product = products.find((p) => p._id === item.id);
        
        return product ? sum + product.price * item.quantity : sum;
        }, 0);

        let deliveryFee = 0
        if (subtotal > 0 && state) {
            const isAbuja = state.trim().toLowerCase() === 'abuja (fct)'
            deliveryFee = isAbuja ? settings.abujaFee : settings.outsideAbujaFee
        }

        return { subtotal, deliveryFee, total: subtotal + deliveryFee };
    };


    const placeOrder = async (deliveryInfo) => {

        if (cartItem.length === 0) {
            toast.error('Your cart is empty')
            return;
        }

        const { subtotal, deliveryFee, total } = getTotalCart(deliveryInfo.state);

        const orderedItems = cartItem.map((cartEntry) => {
            const product = products.find((p) => p._id === cartEntry.id);
            return {
                productId: cartEntry.id,
                size: cartEntry.size,
                quantity: cartEntry.quantity,
                name: product?.name,
                price: product?.price,
                image: product?.images?.[0],
            };
        });

        // combine your form's fields into what the backend expects
        const customerName = `${deliveryInfo.firstName} ${deliveryInfo.lastName}`
        const address = `${deliveryInfo.street}, ${deliveryInfo.state}, ${deliveryInfo.country}`

        try {
            const response = await axios.post(backendUrl + '/api/order/place', {
                items: orderedItems,
                subtotal,
                deliveryFee,
                total,
                customerName,
                email: deliveryInfo.email,
                phone: deliveryInfo.phone,
                address,
                city: deliveryInfo.city,
                note: deliveryInfo.estimatedDelivery
            })

            if (response.data.success) {
                const newOrder = {
                    orderId: response.data.orderId,
                    items: orderedItems,
                    deliveryInfo,
                    subtotal,
                    deliveryFee,
                    total,
                    date: new Date().toLocaleDateString('en-GB', {
                        day: 'numeric', month: 'long', year: 'numeric'
                    }),
                    status: 'pending',
                };

                setOrders((prevOrders) => [newOrder, ...prevOrders]);

                setCartItem([]); // clear cart after order is placed

                // open Korapay payment popup for this order
                window.Korapay.initialize({
                    key: import.meta.env.VITE_KORAPAY_PUBLIC_KEY,
                    reference: response.data.orderId,
                    amount: total,
                    currency: "NGN",
                    notification_url: "https://eightyeight-backend.onrender.com/api/order/korapay-webhook",
                    customer: {
                        name: customerName,
                        email: deliveryInfo.email,
                    },
                    onClose: () => {
                        toast.info('Payment cancelled. Your order was not confirmed.')
                    },
                    onSuccess: () => {
                        // only now do we remember this order on this device
                        const savedIds = JSON.parse(localStorage.getItem('myOrderIds') || '[]');
                        localStorage.setItem('myOrderIds', JSON.stringify([response.data.orderId, ...savedIds]));

                        toast.success('Payment successful!')
                        navigate('/Track-Order');
                    },
                    onFailed: () => {
                        toast.error('Payment failed. Please try placing your order again.')
                    }
                });
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error('Could not place order, please try again')
        }
    };


    const value = {
        products,cartItem,
        setCartItem,
        addToCart,
        removeFromCart,
        getCartCount,
        updateQuantity,
        getTotalCart,
        settings,
        orders,        
        placeOrder,     
        navigate
    }

    


    return (
      <ShopContext.Provider value={value}>
          {children}
      </ShopContext.Provider>
      
    )
}

export default ShopContextProvider
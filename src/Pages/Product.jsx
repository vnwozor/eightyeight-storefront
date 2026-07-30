import React, { useEffect, useState, useContext } from 'react'
import { useParams} from 'react-router-dom'
import { ShopContext } from '../Context/ShopContext'
import './Product.css'
import { assets } from '../Assets/all_products'
import { RelatedProduct } from '../Components/Section/RelatedProduct'

export const Product = () => {

    const { productId } = useParams();
    const { products, addToCart } = useContext(ShopContext);


    const [ productData, setProductData ] = useState(false);
    const [image, setImage] = useState('')
    const [size, setSize] = useState('')

    const fetchProductData = () => {
        products.map((item) => {
            if(item._id === productId) {
                setProductData(item)
                setImage(item.images[0])
                return null;
            }
        })
    }

    useEffect(() => {
        fetchProductData()
    }, [products, productId])

    const formatCurrency = (amount) => {
        return `${amount.toLocaleString()}`
    }



    const [ updateQuantity, setUpdateQuantity ] = useState(1)
    function AddQuantity () {
        setUpdateQuantity(updateQuantity + 1)
    }

    function MinusQuantity () {
        if (updateQuantity > 1) {
            setUpdateQuantity(updateQuantity - 1)
        }
        
    }

    return productData ? (
        <div className='preview-main'>
            <div className='preview-div'>

                <div className='showcase-div'>


                    <div className='showcase-product'>
                        <img src={image} />
                    </div>
                    
                    <div className='showcase-img-div'>

                        {productData.images.map((item,index) => {
                            return (
                            
                                <div className='mag' key={index}>
                                    <img onClick={ () => setImage(item) }  src={item} alt="" className='showcase-img' />
                                </div>
                                    
                            )
                        })}
                    </div>

                </div>
                







                <div className='preview-product-div'>
                    
                    <h1 className='preview-product-name'>
                        {productData.name}
                    </h1>

                    <p className='preview-product-price'>
                        <img src={assets.naira_icon} className='naira-icon'/>
                        {formatCurrency(productData.price)}
                    </p>

                    <div className='preview-size-div'>

                        <div className='preview-title'>
                            SELECT SIZE
                        </div>

                        <div className='product-size-div'>


                            {
                                productData.sizes.map((item, index) => {
                                    return (
                                        <button key={index} onClick={() => setSize(item)} className={`product-size ${item === size ? 'active' : ''}`}>
                                            {item}
                                        </button>
                                    )
                                })
                            }

                            

                        </div>

                    </div>









                    <div className='preview-quantity-div'>

                        <div>

                            <div className='preview-title'>
                                QUANTITY
                            </div>

                            <div className='quantity-div'>
                                <button onClick={MinusQuantity} className='plus-minus-btn'>
                                    -
                                </button>
                                <div>
                                    {updateQuantity}
                                </div>
                                <button onClick={AddQuantity} className='plus-minus-btn'>
                                    +
                                </button>
                            </div>
                        </div>
                        





                        <div className='preview-order-div'>
                            <div className='preview-title'>
                                ORDER {'(NOTE)'} :
                            </div>

                            <div className='preview-order-info'>
                                Can Be Delivered World Wide
                            </div>
                        </div>
                        
                    </div>
                    

                    <div className='preview-description-div'>
                        <div className='preview-title'>
                            DESCRIPTION
                        </div>


                        <p className='preview-description-info'>
                            {productData.description}
                        </p>
                    </div>

                    {productData.outOfStock ? (
                        <button className='addcart-btn' disabled style={{ opacity: 0.5, cursor: 'not-allowed' }}>
                            SOLD OUT
                        </button>
                    ) : (
                        <button onClick={() => addToCart(productData._id,size,updateQuantity)} className='addcart-btn'>
                            ADD TO CART
                        </button>
                    )}


                </div> 

            </div>



            <RelatedProduct category={productData.category} currentProductId={productData._id}/>

            
        </div>
        
    ) : <></>
    
}
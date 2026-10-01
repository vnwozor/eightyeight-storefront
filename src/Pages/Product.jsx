import React, { useEffect, useState, useContext } from 'react'
import { useParams} from 'react-router-dom'
import { ShopContext } from '../Context/ShopContext'
import './Product.css'
import { assets } from '../Assets/all_products'
import { RelatedProduct } from '../Components/Section/RelatedProduct'
import { Footer } from '../Components/Footer/Footer'

export const Product = () => {

    const { productId } = useParams();
    const { products, addToCart } = useContext(ShopContext);


    const [ productData, setProductData ] = useState(false);
    const [imageIndex, setImageIndex] = useState(0)
    const [size, setSize] = useState('')
    const [touchStartX, setTouchStartX] = useState(null)

    const fetchProductData = () => {
        products.map((item) => {
            if(item._id === productId) {
                setProductData(item)
                setImageIndex(0)
                return null;
            }
        })
    }

    useEffect(() => {
        fetchProductData()
    }, [products, productId])

    const imageCount = productData ? productData.images.length : 0

    // wraps around: next on the last image goes back to the first, and vice versa
    const showPrevImage = () => setImageIndex((i) => (i - 1 + imageCount) % imageCount)
    const showNextImage = () => setImageIndex((i) => (i + 1) % imageCount)

    // keyboard arrows also move the slider
    useEffect(() => {
        if (imageCount < 2) return
        const onKeyDown = (e) => {
            if (['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement?.tagName)) return
            if (e.key === 'ArrowLeft') showPrevImage()
            if (e.key === 'ArrowRight') showNextImage()
        }
        window.addEventListener('keydown', onKeyDown)
        return () => window.removeEventListener('keydown', onKeyDown)
    }, [imageCount])

    // swipe left / right on touch screens
    const onTouchStart = (e) => setTouchStartX(e.touches[0].clientX)
    const onTouchEnd = (e) => {
        if (touchStartX === null || imageCount < 2) return
        const distance = e.changedTouches[0].clientX - touchStartX
        if (distance > 40) showPrevImage()
        if (distance < -40) showNextImage()
        setTouchStartX(null)
    }

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
        <>
            <div className='preview-main'>
                <div className='preview-div'>

                    <div className='showcase-div'>


                        <div className='showcase-product' onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
                            <img src={productData.images[imageIndex]} alt={`${productData.name} - view ${imageIndex + 1}`} />

                            {imageCount > 1 && (
                                <>
                                    <button type='button' onClick={showPrevImage} className='slider-arrow slider-arrow-prev' aria-label='Previous image'>
                                        <svg viewBox='0 0 24 24' aria-hidden='true'><path d='M15 6l-6 6 6 6' /></svg>
                                    </button>

                                    <button type='button' onClick={showNextImage} className='slider-arrow slider-arrow-next' aria-label='Next image'>
                                        <svg viewBox='0 0 24 24' aria-hidden='true'><path d='M9 6l6 6-6 6' /></svg>
                                    </button>

                                    <div className='slider-counter'>
                                        {imageIndex + 1} / {imageCount}
                                    </div>
                                </>
                            )}
                        </div>

                        <div className='showcase-img-div'>

                            {productData.images.map((item,index) => {
                                return (

                                    <button type='button' className={`mag ${index === imageIndex ? 'active' : ''}`} key={index} onClick={() => setImageIndex(index)} aria-label={`Show image ${index + 1}`}>
                                        <img src={item} alt='' className='showcase-img' />
                                    </button>

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

            <Footer/>
        </>
        
    ) : <></>
    
}
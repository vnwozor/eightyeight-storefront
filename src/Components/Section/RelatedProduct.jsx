import { useState, useEffect, useContext } from 'react'
import { ShopContext } from '../../Context/ShopContext'
import './RelatedProduct.css'
import { Title } from './Section Title/Title.jsx'
import { assets } from '../../Assets/all_products.js'
import { ProductItem } from './ProductItem.jsx'

const backendUrl = import.meta.env.VITE_BACKEND_URL

export const RelatedProduct = ({ category, currentProductId }) => {

    const {products} = useContext(ShopContext);

    const [related, setRelated] = useState([]);

    useEffect(() => {
        if (products.length > 0 && category) {
            const filtered = products
                .filter((item) => item.category === category && item._id !== currentProductId)
                .slice(0, 4)
            setRelated(filtered)
        }
    }, [products, category, currentProductId])

    const formatCurrency = (amount) => {
        return `${amount.toLocaleString()}`
    }

    return (
        <div className='shirt-section'>

            <div>

                <Title title={'RELATED PRODUCTS'}/>
                
            

                <div className='product-grid'>
                    {related.map((item, index) => {
                        return (
                            <ProductItem key={index} id={item._id} name={item.name} height={item.height} image={item.images?.[0] ? backendUrl + item.images[0] : ''} price={item.price} outOfStock={item.outOfStock}/>
                        )
                    })}
                </div>
                
 
                

                <div className='show-div'>

                    <a className='show-more' href="#">
                        <div>
                            Show More {'>'}
                        </div>
                        
                        <div className='show-more-line' />
                        
                    </a>
                    
                </div>
                
                
            </div>
            
        </div>
    )
}
import { useState, useEffect, useContext } from 'react'
import '../../Components/Section/Shirts.css'
import { Link } from 'react-router-dom'
import { ShopContext } from '../../Context/ShopContext.jsx'
import { assets } from '../../Assets/all_products.js'
import { ProductItem } from '../../Components/Section/ProductItem.jsx'
import { Title } from '../../Components/Section/Section Title/Title.jsx'

export const TrouserSingle = () => {

    const {products} = useContext(ShopContext);

    const [produe, setProdue] = useState([]);

    const columnCount = produe.length

    useEffect(() => {
        const Produe = products.filter((item) => (item.category === 'trouser'))
        setProdue(Produe.slice(0,4))
    }, [products])

    const formatCurrency = (amount) => {
        return `${amount.toLocaleString()}`
    }

    return columnCount > 0 ? (
    
        <div className='shirt-section'>

            <div>

                <Title title={'TROUSERS'}/>

                <div className='item-grid'  style={{ '--cols': columnCount }}>
                    {produe.map((item, index) => {
                        return (
                            <ProductItem key={index} id={item._id} name={item.name} height={item.height} image={item.images?.[0] || ''} price={item.price} outOfStock={item.outOfStock}/>
                        )
                    })}
                </div>

                <div className='show-div'>

                    <Link to='/Trousers' className='show-more' href="#">
                        <div>
                            Show More {'>'}
                        </div>
                        <div className='show-more-line' />
                    </Link>

                </div>

            </div>

        </div>
 
        
    ) : <></>
}
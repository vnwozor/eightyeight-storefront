import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Navbar } from './Components/Navbar/Navbar'
import { HomePage } from './Pages/HomePage'
import { Footer } from './Components/Footer/Footer'
import './App.css'
import { Categories } from './Pages/Categories'
import { Product } from './Pages/Product'
import { CartPage } from './Pages/CartPage'
import { ToastContainer, toast } from 'react-toastify';
import { PolicyPage} from './Pages/Resources Page/PolicyPage'
import { FaqPage } from './Pages/Resources Page/FaqPage'
import { AboutPage } from './Pages/Resources Page/AboutPage'
import { PlaceOrder } from './Pages/PlaceOrder'
import { OrderPage } from './Pages/OrderPage'
import { Shirts } from './Components/Section/Shirts'
import { Trousers } from './Components/Section/Trousers'
import { Accessories } from './Components/Section/Accessories'
import { Shoes } from './Components/Section/Shoes'
import { Allproducts } from './Pages/Allproducts'


function App() {

  return (
    <>
      <div>
        <ToastContainer/>
        <Navbar/>


        {/* <div className="page-content"> */}


        
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/Product/:productId' element={<Product/>} />
            <Route path='/Cart' element={<CartPage/>} />

            <Route path='/All-Products' element={<Allproducts/>} />
            
            <Route path='/Shirts' element={<Shirts/>} />
            <Route path='/Trousers' element={<Trousers/>} />
            <Route path='/Accessories' element={<Accessories/>} />
            <Route path='/Shoes' element={<Shoes/>} />


            {/* footer link */}

            <Route path='/Resource/Policy' element={<PolicyPage/>}/>
            <Route path='/Resource/FAQ' element={<FaqPage/>}/>
            <Route path='/Support/About Us' element={<AboutPage/>}/>


            <Route path='/Place-Order' element={<PlaceOrder/>} />
            <Route path='/Track-Order' element={<OrderPage/>} />
          </Routes>
{/* 
        </div> */}

        <Footer />

      </div>
        
    </>
  )
}

export default App

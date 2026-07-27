import React, { useState } from 'react'
import './Footer.css'
import { assets } from '../../Assets/all_products'
import { Link } from 'react-router-dom'

export const Footer = () => {

    const onSubmitHandler = (event) => {
        event.preventDefault();
    }


    const [resourceLine, setResourceLine] = useState(false)

    const [supportLine, setSupportLine] = useState(false)

  return (
    <div className='footer-main'>

        {/* <div className='offer-div'>
            
            <h1 className='offer-title'>
                Get Exculsive Offers On Your Email
            </h1>

            <p className='offer-description'>
                Subscribe To our NewsLetters And Stay Updated
            </p>
        

            <form onSubmit={onSubmitHandler} className='email-div'>
                <input className='email-input' placeholder='Email' type="email" />

                <button type='submit' className='send-btn'>
                    SEND
                </button>
            </form>

        </div> */}



        <div className='footer-div'>

            <div>
                <h3 className='social-title'>
                    SOCIALS
                </h3>
                <div className='logo-div'>
                    <a href="mailto:eightyeight.ng@gmail.com?subject=Hello">
                        <img src={assets.mail_logo} alt="" />
                    </a>

                    <a href="https://www.instagram.com/8ighty8ight.ng?igsh=MTlubHh2bDdpbzNmdA==">
                        <img src={assets.instagram_logo} alt="instagram logo" />
                    </a>
                    
                    <a href="https://wa.me/2349156421440">
                        <img src={assets.whatsapp_logo} alt="" />
                    </a>
                    
                </div>
            </div>



            <div className='footer-right-div'>

                <div className='footer-title-div' >

                    <div className='title-div' onClick={() => setResourceLine(!resourceLine)}>

                        <h3 className='footer-title'>
                            RESOURCES
                        </h3>

                        <div  className={`resource-Line ${resourceLine ? 'open' : ''}`}>
                            {'>'}
                        </div>


                    </div>
                    
                    <div className={`link-div ${resourceLine ? 'open' : ''}`} >


                        <Link to='/Resource/FAQ'  className='footer-link' href="#">
                            <div>
                                FAQ
                                <div className='link-line' />
                            </div>
                        </Link>

                        <Link to='/Resource/Policy' className='footer-link' href="#">
                            <div>
                                Policy
                                <div className='link-line' />
                            </div>
                        </Link>


                    </div>
                    
                </div>







            



                <hr  className='across-line'/>

                <div className='footer-title-div'>
                    <div className='title-div' onClick={() => setSupportLine(!supportLine)}>

                        <h3 className='footer-title'>
                            SUPPORTS
                        </h3>

                        <div  className={`support-Line ${supportLine ? 'open' : ''}`}>
                            {'>'}
                        </div>
                        

                    </div>
                    


                    <div className={`link-div ${supportLine ? 'open' : ''}`} >
                        <Link to='/Support/About Us' className='footer-link' href="#">
                            <div>
                                About Us
                                <div className='link-line' />
                            </div>
                        </Link>

                    </div>
                    

                    
                </div>

                <hr  className='across-line'/>





                {/* <div className='footer-title-div'>
                    <h3 className='footer-title'>
                        STORE ADDRESS
                    </h3>
                    <p>
                        LIFE CAMP, 
                        GWARIMPA, ABUJA, NIGERIA
                    </p>

                    
                </div> */}

            </div>


        </div>

    </div>
  )
}


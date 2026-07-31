import React from 'react'
import './HomeFooter.css'
import { assets } from '../../Assets/all_products'

export const HomeFooter = () => {
  return (
    <div className='homefooter-main'>
        <div className='homefooter-div'>
            <a href="mailto:eightyeight.ng@gmail.com?subject=Hello" >
                <p>CONTACT US</p>
            </a>

            <a href="mailto:eightyeight.ng@gmail.com?subject=Hello" className='homefooter-mail'>
                eightyeight.ng@gmail.com
            </a>
        </div>

        <div className='homefooter-img-div'>
            <a href="https://www.instagram.com/8ighty8ight.ng?igsh=MTlubHh2bDdpbzNmdA==">
                <img src={assets.instagramblack_logo}  className='homefooter-png' />
            </a>

            <a href="">
                <img src={assets.youtubeblack_logo}  className='homefooter-png'/>
            </a>

            <a href="">
                <img src={assets.tiktok_logo} className='homefooter-png'/>
            </a>

            <a href="">
                <img src={assets.pinterest_logo}  className='homefooter-png'/>
            </a>
            
            
            
            
        </div>

    </div>
  )
}

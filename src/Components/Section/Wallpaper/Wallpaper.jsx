import React, { useContext, useEffect, useState } from 'react'
import './Wallpaper.css'
import { assets, products } from '../../../Assets/all_products'
import { ShopContext } from '../../../Context/ShopContext'

export const Wallpaper = () => {


    const [letCount, setLetCount] = useState(0)
    
    const WallpaperSwitch = () => {

        if (letCount === 0) {
            return (
                <img src={assets.wallpaper_1} className='wallpaper' alt="wallpaper" />
            )

        } else if (letCount === 1) {
            return (
                <img src={assets.wallpaper_2} className='wallpaper' alt="wallpaper" />
            )
        } else if (letCount === 2) {
            return (
                <img src={assets.wallpaper_3} className='wallpaper' alt="wallpaper" />
            )
        } else if (letCount === 3) {
            return (
                <img src={assets.wallpaper_4} className='wallpaper' alt="wallpaper" />
            )
        } else if (letCount === 4) {
            return (
                <img src={assets.wallpaper_5} className='wallpaper' alt="wallpaper" />
            )
        }else if (letCount === 5) {
            return (
                <img src={assets.wallpaper_6} className='wallpaper' alt="wallpaper" />
            )
        } else if (letCount === 6) {
            return (
                <img src={assets.wallpaper_7} className='wallpaper' alt="wallpaper" />
            )
        } else if (letCount === 7) {
            return (
                <img src={assets.wallpaper_8} className='wallpaper' alt="wallpaper" />
            )
        } else if (letCount === 8) {
            return (
                <img src={assets.wallpaper_9} className='wallpaper' alt="wallpaper" />
            )
        } else if (letCount === 9) {
            return (
                <img src={assets.wallpaper_10} className='wallpaper' alt="wallpaper" />
            )
        } else if (letCount === 10) {
            return (
                <img src={assets.wallpaper_11} className='wallpaper' alt="wallpaper" />
            )
        } else if (letCount === 11) {
            return (
                <img src={assets.wallpaper_12} className='wallpaper' alt="wallpaper" />
            )
        }

        

    } 

    useEffect ( () => {
        WallpaperSwitch()
        
        const intervalId = setInterval(() => {
            setLetCount((prev) => (prev < 11 ? prev + 1 : 0))
        }, 2000)

        return () => clearInterval(intervalId)
    }, [])
    

    return (
        <>
            {WallpaperSwitch()}

            
        </>
    )
}

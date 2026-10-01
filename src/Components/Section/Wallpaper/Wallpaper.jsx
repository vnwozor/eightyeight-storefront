import React, { useEffect, useState } from 'react'
import './Wallpaper.css'
import { assets } from '../../../Assets/all_products'

const wallpapers = [
    assets.wallpaper_1, assets.wallpaper_2, assets.wallpaper_3, assets.wallpaper_4,
    assets.wallpaper_5, assets.wallpaper_6, assets.wallpaper_7, assets.wallpaper_8,
    assets.wallpaper_9, assets.wallpaper_10, assets.wallpaper_11, assets.wallpaper_12,
]

export const Wallpaper = () => {

    const [letCount, setLetCount] = useState(0)

    useEffect(() => {
        const intervalId = setInterval(() => {
            setLetCount((prev) => (prev + 1) % wallpapers.length)
        }, 2000)

        return () => clearInterval(intervalId)
    }, [])

    // load the next photo ahead of time so the swap never flashes blank
    useEffect(() => {
        const next = new Image()
        next.src = wallpapers[(letCount + 1) % wallpapers.length]
    }, [letCount])

    // The frame has a fixed size and every photo is cropped to fill it,
    // so the page height never changes between photos (that was the "shaking").
    return (
        <div className='wallpaper-frame'>
            <img src={wallpapers[letCount]} className='wallpaper' alt="Eighty Eight lookbook" />
        </div>
    )
}

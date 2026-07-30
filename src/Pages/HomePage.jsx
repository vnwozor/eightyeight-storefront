import { Accessories } from '../Components/Section/Accessories.jsx'
import { Shirts } from '../Components/Section/Shirts.jsx'
import { Shoes } from '../Components/Section/Shoes.jsx'
import { Trousers } from '../Components/Section/Trousers.jsx'
import { Wallpaper } from '../Components/Section/Wallpaper/Wallpaper.jsx'



export const HomePage = () => {
    return (
        <>
            <Wallpaper/>
                  
            <Shirts />

            <Trousers/>

            <Shoes/>

            <Accessories/>
            

        </>
    )
}

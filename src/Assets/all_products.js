/* products */
import E8_Bag from "./E8-BP-001.svg"
import E8_shirt_1 from "./E8-TS-001.svg"
import E8_shirt_2 from "./E8-TS-002.svg"
import E8_slides from "./E8-SL-001.svg"

/* wallpaper */
import wallpaper_1 from './wallpaper 2.jpeg'
import wallpaper_2 from './wallpaper 3.jpeg'
import wallpaper_3 from './wallpaper 4.jpeg'
import wallpaper_4 from './wallpaper 5.PNG'
import wallpaper_5 from './wallpaper 6.jpeg'
import wallpaper_6 from './wallpaper 7.jpeg'
import wallpaper_7 from './wallpaper 8.jpeg'
import wallpaper_8 from './wallpaper 9.PNG'
import wallpaper_9 from './wallpaper 10.jpeg'
import wallpaper_10 from './wallpaper 11.jpeg'
import wallpaper_11 from './wallpaper 12.PNG'
import wallpaper_12 from './wallpaper 13.PNG'


/* Product Image Showcase */
import front_view from './front-view-shirt.svg'
import right_view from './right-view-shirt.svg'
import back_view from './back-view-shirt.svg'
import left_view from './left-view-shirt.svg'

/* icons */
import naira_icon from './icons/naira-icon.svg'
import cart_icon from './icons/cart-icon.svg'
import close_icon from './icons/close-icon.svg'
import menu_bar from './icons/menu-bar.svg'
import home_icon from './icons/home-icon.svg'
import search_icon from './icons/search-icon.svg'
import profile_icon from './icons/profile-icon.svg'
import made_logo from './icons/made-logo.svg'

/* logos */
import logo from './icons/logo.svg'
import mail_logo from './icons/mail-logo.svg'
import instagram_logo from './icons/instagram-logo.svg'
import whatsapp_logo from './icons/WhatsApp-Logo.svg'

export const assets = {
    naira_icon,
    cart_icon,
    close_icon,
    menu_bar,
    logo,
    mail_logo,
    instagram_logo,
    whatsapp_logo,
    home_icon,
    search_icon ,
    profile_icon,
    front_view,
    right_view,
    back_view,
    left_view,
    wallpaper_1, 
    wallpaper_2, 
    wallpaper_3, 
    wallpaper_4,
    wallpaper_5, 
    wallpaper_6,
    wallpaper_7,
    wallpaper_8,
    wallpaper_9,
    wallpaper_10,
    wallpaper_11,
    wallpaper_12,
    made_logo

    
};

export let products = [
    {
        id:1,
        name:'EIGHTYEIGHT-BAG PACK',
        category:'accessory',
        image: [E8_Bag, right_view, back_view, left_view],
        price: 75000,
        sizes: ["S", "M", "L" , "XL"],
    },{
        id:2,
        name:'EIGHTYEIGHT-EFCC',
        category:'shirt',
        image: [E8_shirt_1],
        price: 75000,
        sizes: ["S", "M", "L" , "XL"],
    },{
        id:3,
        name:'EIGHTYEIGHT-DARK HEAT',
        category:'shirt',
        image: [E8_shirt_2],
        price: 75000,
        sizes: ["S", "M", "L" , "XL"],
    },{
        id:4,
        name:'EIGHTYEIGHT-TECH SLIDES',
        category:'shoe',
        image: [E8_slides],
        price: 40000,
        sizes: ["S", "M", "L" , "XL"],
    },{
        id:4,
        name:'EIGHTYEIGHT-TECH SLIDES',
        category:'shoe',
        image: [E8_slides],
        price: 40000,
        sizes: ["S", "M", "L" , "XL"],
    }
];



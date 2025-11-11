import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { Home } from '../pages/Home'
import { Products } from '../pages/Products'
import { Cart } from '../pages/Cart'
import { Detail } from '../pages/Detail'
import { ProductsByCategory } from '../pages/ProductsByCategory'
import { NavBar } from '../components/NavBar'
import { ProductsByName } from '../pages/ProductsByName'
import { Footer } from '../components/Footer'

export const MainRouter = () => {
    return (
        <BrowserRouter>
            <NavBar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path='/products' element={<Products />} />
                <Route path='/cart' element={<Cart />} />
                <Route path='/product/:id' element={<Detail/>}/>
                <Route path='/category/:name' element={<ProductsByCategory/>} />
                <Route path='/search/tuki' element={<ProductsByName/>} />
                <Route path='*' element={<h1 className='text-3xl font-bold text-center mt-10'>404 - Not Found</h1>} />
            </Routes>
            <Footer />
        </BrowserRouter>
    )
}


import {BrowserRouter, Routes, Route} from 'react-router-dom';
import { Home } from '../pages/Home';
import { Products } from '../pages/Products';
import { Cart } from '../pages/Cart';
import { Detail } from '../pages/Detail';
import { ProductsByCategory } from '../pages/ProductsByCategory';
import { NavBar } from '../components/NavBar';
import { ProductsByName } from '../pages/ProductsByName';

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
            </Routes>
        </BrowserRouter>
    )
}


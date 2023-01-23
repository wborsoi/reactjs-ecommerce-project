import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home/Home';
import Store from './pages/Store/Store'
import PageNotFound from './pages/PageNotFound';
import ItemDetailContainer from './components/ItemDetailContainer/ItemDetailContainer';
import CartReview from './pages/Cart/CartReview';
import CheckoutScreen from './pages/Checkout/CheckoutScreen';
import LoginScreen from './pages/Login/LoginScreen';

function App() {
  return (
    <main className='App'>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/tienda' element={<Store />} />
          <Route path='/tienda/:category' element={<Store />} />
          <Route path='/tienda/:category/:subcategory' element={<Store />} />
          <Route path='/item/:id' element={<ItemDetailContainer />} />
          <Route path='/carrito' element={<CartReview />} />
          <Route path='/checkout' element={<CheckoutScreen />} />
          <Route path='/login' element={<LoginScreen />} />
          <Route path='*' element={<PageNotFound />} />
        </Routes>
    </main>
  );

}

export default App;

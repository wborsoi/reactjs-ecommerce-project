import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Navbar from './components/Navbar/Navbar';
//import ItemListContainer from './components/ItemListContainer/ItemListContainer';
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home/Home';
import Store from './pages/Store/Store'
import PageNotFound from './pages/PageNotFound';
import ItemDetailContainer from './components/ItemDetailContainer/ItemDetailContainer';
import Context from './components/Context/Context';
import { useContext } from 'react';

function App() {
  const { cartContext, sessionContext } = useContext(Context);

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/tienda' element={<Store />} />
        <Route path='/tienda/:category' element={<Store />} />
        <Route path='/tienda/:category/:subcategory' element={<Store />} />
        <Route path='/item/:id' element={<ItemDetailContainer />} />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </div>
  );

}

export default App;

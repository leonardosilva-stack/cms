// import logo from './logo.svg';
import './App.css';
// import { Button } from 'react-bootstrap'
import { BrowserRouter, Route,Routes } from 'react-router-dom'
import Login from './Login'
import Register from './Register'
import AddProduct from './AddProduct'
import UpdateProduct from './UpdateProduct'
import Protected from './Protected'
import ProductList from './ProductList'
import SearchProduct from './SearchProduct'

function App() {
  return (
    <div className="App">
      <BrowserRouter >
        {/* <Header /> */}
        <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/"  element={<Protected Cmp={ProductList} />} />
        <Route path="/add"  element={<Protected Cmp={AddProduct} />} />
        <Route path="/update/:id" element={<Protected Cmp={UpdateProduct} />} />
        <Route path="/search" element={<Protected Cmp={SearchProduct} />} />
        {/* <Route path="/update" element={<UpdateProduct />} /> */}
        </Routes>


      </BrowserRouter>
    </div>
  );
}

export default App;

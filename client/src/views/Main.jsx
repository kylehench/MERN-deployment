import React, { useState } from 'react'
import ProductForm from '../components/ProductForm';
import Products from '../components/Products';
import axios from 'axios';

const Main = () => {
  const [products, setProducts] = useState([])
  const [newProduct, setNewProduct] = useState({})

  const removeFromDom = id => setProducts(products.filter(product => id !== product._id))

  const createProduct = product => {
    axios.post('http://localhost:8000/api/products', product)
      .then( res => {
        console.log(res)
        console.log(res.data)
        setProducts([...products, res.data])
      })
      .catch( err => console.log(err))
  }
  
  return (
    <div className="container mt-3">
      <h2>Create Product</h2>
      <ProductForm product={newProduct} setProduct={setNewProduct} onSubmitProp={createProduct} products={products} setProducts={setProducts} submitText="Create" />
      <hr />
      <Products products={products} setProducts={setProducts} removeFromDom={removeFromDom} />
    </div>
  )
}

export default Main
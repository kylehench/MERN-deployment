import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import ProductForm from './ProductForm'
import DeleteButton from './DeleteButton'

const Update = (props) => {
  const { products, setProducts } = props
  const [product, setProduct] = useState({title:'', price: '', description: ''})
  const [loaded, setLoaded] = useState(false)
  const { id } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    axios.get(`http://localhost:8000/api/products/${id}`)
      .then(res => {
        setProduct(res.data)
        setLoaded(true)
      })
      .catch(err => console.log(err))
  },[])

  const onSubmitHandler = e => {
    e.preventDefault()
    axios.put(`http://localhost:8000/api/products/${id}`, {
      title: product.title,
      price: product.price,
      description: product.description,
    })
      .then( res => {
        console.log(res)
        console.log(res.data)
        navigate('/')
      })
      .catch( err => console.log(err))
  }

  const updateProduct = product => {
    axios.put(`http://localhost:8000/api/products/${id}`, product)
      .then( res => {
        console.log(res)
        console.log(res.data)
        navigate('/')
      })
      .catch( err => console.log(err))
  }

  return (
    <div className='container mt-3'>
      <h2>Edit Product</h2>
      { loaded && <>
        <ProductForm product={product} setProduct={setProduct} onSubmitProp={updateProduct} submitText="Edit" />
        <div className="my-2">
          <DeleteButton productId={product._id} successCallback={() => navigate('/')} />
        </div>
        <button onClick={() => navigate('/')} className='btn btn-secondary btn-sm'>Cancel</button>
      </> }
    </div>
  )
}

export default Update
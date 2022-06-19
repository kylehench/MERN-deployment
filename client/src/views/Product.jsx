import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'

const Product = (props) => {
  const { id } = useParams()
  const [product, setProduct] = useState({})

  useEffect(() => {
    axios.get(`http://localhost:8000/api/products/${id}`)
    .then(res => {
      console.log(res.data)
      setProduct(res.data)
    })
    .catch(err => console.log(err))
  }, [])

  return (
    <div className='container mt-3'>
      <h2>{product.title}</h2>
      <p>
        Price: ${product.price} <br />
        Description: {product.description}
      </p>
    </div>
  )
}

export default Product
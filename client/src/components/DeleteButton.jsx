import React from 'react'
import axios from 'axios'

const DeleteButton = (props) => {
  const { productId, successCallback } = props
  
  const deleteProduct = productId => {
    axios.delete(`http://localhost:8000/api/products/${productId}`)
      .then(successCallback())
      .catch(err => console.log(err))
  }
  
  return (
    <button onClick={e => deleteProduct(productId)} className='btn btn-sm btn-danger'>Delete</button>
  )
}

export default DeleteButton
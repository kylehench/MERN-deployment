import React, { useState } from 'react'
import axios from 'axios'

const ProductForm = (props) => {
  const { onSubmitProp, product, setProduct, submitText } = props

  const onSubmitHandler = e => {
    e.preventDefault()
    onSubmitProp(product)
  }

  return (
    <form onSubmit={onSubmitHandler}>
      <label>Title:</label>
      <input type="text" value={product.title} onChange={(e) => setProduct({...product, title: e.target.value})} className="form-control mb-2"/>
      <label>Price:</label>
      <input type="text" value={product.price} onChange={(e) => setProduct({...product, price: e.target.value})} className="form-control mb-2"/>
      <label>Description:</label>
      <input type="text" value={product.description} onChange={(e) => setProduct({...product, description: e.target.value})} className="form-control mb-2"/>
      <input type="submit" value={submitText} className="btn btn-primary" />
    </form>
  )
}

export default ProductForm
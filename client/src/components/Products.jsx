import React, { useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import DeleteButton from './DeleteButton'

const Products = (props) => {
  const { removeFromDom, products, setProducts } = props

  useEffect(() => {
    axios.get('http://localhost:8000/api/products')
      .then(res => {
        console.log(res.data)
        setProducts(res.data)
      })
      .catch(err => console.log(err))
  }, [])

  return (
    <div>
      <h2>Products</h2>
      <table className='table table-hover'>
        <tbody>
          <tr>
            <th>Title</th>
            <th>Price</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
          { products.map((product, index) =>
            <tr key={index}>
              <td className='py-2'>{product.title}</td>
              <td className='py-2'>${product.price}</td>
              <td className='py-2'>{product.description}</td>
              <td className='py-2'>
                <Link to={`/${product._id}`}>View</Link>&nbsp;|&nbsp;
                <Link to={`/products/edit/${product._id}`}>Edit</Link>&nbsp;|&nbsp;
                <DeleteButton productId={product._id} successCallback={() => removeFromDom(product._id)} />
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Products
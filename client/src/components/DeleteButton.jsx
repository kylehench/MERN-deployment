import React from 'react'
import axios from 'axios'

const DeleteButton = (props) => {
  const { petId, successCallback } = props
  
  const deletePet = petId => {
    axios.delete(`http://localhost:8000/api/pets/${petId}`)
      .then(successCallback())
      .catch(err => console.log(err))
  }
  
  return (
    <button onClick={e => deletePet(petId)} className='btn btn-sm btn-warning'>Adopt</button>
  )
}

export default DeleteButton
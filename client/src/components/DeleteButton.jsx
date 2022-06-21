import React from 'react'
import axios from 'axios'

const DeleteButton = (props) => {
  const { pet, successCallback, hideName } = props
  
  const deletePet = petId => {
    axios.delete(`http://localhost:8000/api/pets/${petId}`)
      .then(successCallback())
      .catch(err => console.log(err))
  }
  
  return (
    <button onClick={e => deletePet(pet._id)} className='btn btn-sm btn-warning'>Adopt {hideName===undefined && pet.name}</button>
  )
}

export default DeleteButton
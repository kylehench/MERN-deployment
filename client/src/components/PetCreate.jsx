import React, { useState } from 'react'
import PetForm from '../components/PetForm';
import axios from 'axios';

const Main = (props) => {
  const { pets, setPets } = props
  const emptyPet = {name: '', type: '', description: '', skillCount: 0}
  const [newPet, setNewPet] = useState(emptyPet)
  const [validationErrors, setValidationErrors] = useState({})

  const createPet = () => {
    axios.post('http://localhost:8000/api/pets', newPet)
      .then( res => {
        console.log(res)
        console.log(res.data)
        setPets([...pets, res.data])
        setNewPet(emptyPet)
        setValidationErrors({})
      })
      .catch(err => setValidationErrors(err.response.data.errors))
  }
  
  return (
    <div>
      <h2>Create Pet</h2>
      <PetForm pet={newPet} setPet={setNewPet} onSubmitProp={createPet} pets={pets} setPets={setPets} validationErrors={validationErrors}submitText="Create" />
    </div>
  )
}

export default Main
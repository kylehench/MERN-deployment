import React, { useState } from 'react'
import PetForm from '../components/PetForm';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Main = () => {
  const [newPet, setNewPet] = useState({name: '', type: '', description: '', skills: ['','','']})
  const [validationErrors, setValidationErrors] = useState({})
  const navigate = useNavigate()

  const createPet = () => {
    const tmpPet = newPet
    tmpPet.skills = tmpPet.skills.filter(skill => skill !== '')    
    axios.post('http://localhost:8000/api/pets', tmpPet)
      .then( res => {
        setValidationErrors({})
        navigate('/')
      })
      .catch(err => setValidationErrors(err.response.data.errors))
  }
  
  return (
    <div className='container mt-3'>
      <div className='d-flex justify-content-between'>
        <h1>Pet Shelter</h1>
        <Link  to={`/`}>back to home</Link>
      </div>
      <h4 className='my-3'>Know a pet needing a home?</h4>
      <PetForm pet={newPet} setPet={setNewPet} onSubmitProp={createPet} validationErrors={validationErrors} submitText="Add Pet" />
    </div>
  )
}

export default Main
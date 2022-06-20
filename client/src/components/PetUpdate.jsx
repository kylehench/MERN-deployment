import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import PetForm from './PetForm'
import DeleteButton from './DeleteButton'

const Update = (props) => {
  const { pets, setPets } = props
  // const emptyPet = {name: '', type: '', description: '', skillCount: 0}
  const [pet, setPet] = useState({})
  const [validationErrors, setValidationErrors] = useState({})
  const [loaded, setLoaded] = useState(false)
  const { id } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    axios.get(`http://localhost:8000/api/pets/${id}`)
      .then(res => {
        setPet(res.data)
        setLoaded(true)
      })
      .catch(err => console.log(err))
  },[])

  const updatePet = () => {
    axios.put(`http://localhost:8000/api/pets/${id}`, pet)
      .then( res => {
        console.log(res)
        console.log(res.data)
        setValidationErrors({})
        navigate('/')
      })
      .catch(err => setValidationErrors(err.response.data.errors))
  }

  return (
    <div className='container mt-3'>
      <h2>Edit Pet</h2>
      { loaded && <>
        <PetForm pet={pet} setPet={setPet} onSubmitProp={updatePet} validationErrors={validationErrors} submitText="Edit" />
        <div className="my-2">
          <DeleteButton petId={pet._id} successCallback={() => navigate('/')} />
        </div>
        <button onClick={() => navigate('/')} className='btn btn-secondary btn-sm'>Cancel</button>
      </> }
    </div>
  )
}

export default Update
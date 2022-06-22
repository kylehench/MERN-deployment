import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import { useNavigate, useParams, Link } from 'react-router-dom'
import PetForm from '../components/PetForm'

const Update = (props) => {
  const { socket } = props
  const [pet, setPet] = useState({})
  const petRef = useRef({})
  petRef.current = pet
  const [initialName, setInitialName] = useState('')
  const [validationErrors, setValidationErrors] = useState({})
  const [loaded, setLoaded] = useState(false)
  const { id } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    axios.get(`http://localhost:8000/api/pets/${id}`)
      .then(res => {
        const tmpPet = res.data
        for (let i = tmpPet.skills.length; i < 3; i++) tmpPet.skills.push('')
        setPet(tmpPet)
        setInitialName(res.data.name)
        setLoaded(true)
      })
      .catch(err => console.log(err))
  },[])

  const updatePet = () => {
    const tmpPet = pet
    tmpPet.skills = tmpPet.skills.filter(skill => skill !== '')
    axios.put(`http://localhost:8000/api/pets/${id}`, tmpPet)
      .then( res => {
        setValidationErrors({})
        navigate('/')
      })
      .catch(err => setValidationErrors(err.response.data.errors))
  }

  useEffect(() => {
    socket.on('adopt', data => {
      console.log('adoption event')
      if (data._id===petRef.current._id) navigate('/')
    })
  }, [])

  return (
    <div className='container mt-3'>
      <div className='d-flex justify-content-between'>
        <h1>Pet Shelter</h1>
        <Link  to={`/`}>back to home</Link>
      </div>
      { loaded && <>
      <h4 className='my-3'>Edit {initialName}</h4>
        <PetForm pet={pet} setPet={setPet} onSubmitProp={updatePet} validationErrors={validationErrors} submitText="Edit Pet" />
        <div className="my-2">
        </div>
      </> }
    </div>
  )
}

export default Update
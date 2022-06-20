import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'

const Pet = (props) => {
  const { id } = useParams()
  const [pet, setPet] = useState({})

  useEffect(() => {
    axios.get(`http://localhost:8000/api/pets/${id}`)
    .then(res => {
      console.log(res.data)
      setPet(res.data)
    })
    .catch(err => console.log(err))
  }, [])

  return (
    <div className='container mt-3'>
      <h2>{pet.name}</h2>
      <p>
        <b>Type:</b> {pet.type}<br />
        <b>Description:</b> {pet.description}<br />
        <b>Number of Skills:</b> {pet.skillCount}
      </p>
    </div>
  )
}

export default Pet
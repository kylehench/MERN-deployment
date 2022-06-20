import React, { useState } from 'react'
import PetCreate from '../components/PetCreate'
import Pets from '../components/Pets'

const Main = () => {
  const [pets, setPets] = useState([])

  return (
    <div className="container mt-3">
      <PetCreate pets={pets} setPets={setPets} />
      <hr className='my-4' />
      <Pets pets={pets} setPets={setPets} />
    </div>
  )
}

export default Main
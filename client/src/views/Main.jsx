import React, { useState } from 'react'
import Pets from '../components/Pets'

const Main = (props) => {
  const { socket } = props
  const [pets, setPets] = useState([])

  return (
    <div className="container mt-3">
      <span>{props.testProp}</span>
      <Pets pets={pets} setPets={setPets} socket={socket} />
    </div>
  )
}

export default Main
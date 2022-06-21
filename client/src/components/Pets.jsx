import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import DeleteButton from './DeleteButton'
import Like from './Like'
import io from 'socket.io-client'

const Pets = (props) => {
  const { pets, setPets } = props
  const [socket] = useState(() => io(':80'))
  // const [socket] = useState(() => io(':8000'))

  useEffect(() => {
    axios.get('http://localhost:8000/api/pets')
      .then(res => {
        console.log(res.data)
        setPets(res.data)
      })
      .catch(err => console.log(err))
  }, [])

  useEffect(() => {
    socket.on('adopt', data => {
      console.log(data)
      removeFromDom(data._id)
    })
    socket.on('hello', data => {
      console.log(`From socket.io: ${data.msg}`)
    })
  }, [])

  const removeFromDom = _id => {
    setPets(pets => pets.filter(pet => _id !== pet._id))
  }

  return (
    <div>
      <h2>Pets</h2>
      <table className='table table-hover'>
        <tbody>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Description</th>
            <th>Number of Skills</th>
            <th>Likes</th>
            <th style={{width: '190px'}}>Actions</th>
          </tr>
          { pets
            .sort((a, b) => a.type.toLowerCase() > b.type.toLowerCase() ? 1:-1)
            .map((pet) =>
            <tr key={pet._id}>
              <td>{pet.name}</td>
              <td>{pet.type}</td>
              <td>{pet.description}</td>
              <td>{pet.skillCount}</td>
              <td><Like pet={pet} id={pet._id} /></td>
              <td>
                <button className='btn btn-sm btn-secondary me-2'>
                  <Link to={`/${pet._id}`} style={{ color: 'inherit', textDecoration: 'inherit'}}>View</Link>
                </button>
                {/* &nbsp;|&nbsp; */}
                <button className='btn btn-sm btn-secondary me-2'>
                  <Link to={`/pets/edit/${pet._id}`} style={{ color: 'inherit', textDecoration: 'inherit'}}>Edit</Link>
                </button>
                {/* &nbsp;|&nbsp; */}
                <DeleteButton
                  petId={pet._id}
                  successCallback={() => {
                    removeFromDom(pet._id)
                    socket.emit('adopt', {_id: pet._id})
                  }}
                />
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Pets
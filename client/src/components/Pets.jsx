import React, { useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import DeleteButton from './DeleteButton'
import Like from './Like'
import io from 'socket.io-client'

const Pets = (props) => {
  const { pets, setPets } = props

  useEffect(() => {
    axios.get('http://localhost:8000/api/pets')
      .then(res => {
        console.log(res.data)
        setPets(res.data)
      })
      .catch(err => console.log(err))
  }, [])

  const removeFromDom = id => setPets(pets.filter(pet => id !== pet._id))

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
            .map((pet, index) =>
            <tr key={index}>
              <td className='py-2'>{pet.name}</td>
              <td className='py-2'>{pet.type}</td>
              <td className='py-2'>{pet.description}</td>
              <td className='py-2'>{pet.skillCount}</td>
              <Like pet={pet} />
              <td className='py-2'>
                <button className='btn btn-sm btn-secondary me-2'>
                  <Link to={`/${pet._id}`} style={{ color: 'inherit', textDecoration: 'inherit'}}>View</Link>
                </button>
                {/* &nbsp;|&nbsp; */}
                <button className='btn btn-sm btn-secondary me-2'>
                  <Link to={`/pets/edit/${pet._id}`} style={{ color: 'inherit', textDecoration: 'inherit'}}>Edit</Link>
                </button>
                {/* &nbsp;|&nbsp; */}
                <DeleteButton petId={pet._id} successCallback={() => removeFromDom(pet._id)} />
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Pets
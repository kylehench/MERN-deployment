import React, { useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import DeleteButton from './DeleteButton'

const Pets = (props) => {
  const { pets, setPets, socket } = props

  useEffect(() => {
    axios.get('http://localhost:8000/api/pets')
      .then(res => {
        setPets(res.data)
      })
      .catch(err => console.log(err))
  }, [])

  useEffect(() => {
    socket.on('adopt', data => {
      console.log('adoption event')
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
      <div className='d-flex justify-content-between'>
        <h1>Pet Shelter</h1>
        <Link to={`/pets/new/`}>add a pet to the shelter</Link>
      </div>
      <h4 className='my-3'>These pets are looking for a good home</h4>
      <table className='table table-hover'>
        <tbody>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th >Actions</th>
          </tr>
          { pets
            .sort((a, b) => a.type.toLowerCase() > b.type.toLowerCase() ? 1:-1)
            .map((pet) =>
            <tr key={pet._id}>
              <td>{pet.name}</td>
              <td>{pet.type}</td>
              <td>
                <button className='btn btn-sm btn-secondary me-2'>
                  <Link to={`/pets/${pet._id}`} style={{ color: 'inherit', textDecoration: 'inherit'}}>View</Link>
                </button>
                {/* &nbsp;|&nbsp; */}
                <button className='btn btn-sm btn-secondary me-2'>
                  <Link to={`/pets/${pet._id}/edit`} style={{ color: 'inherit', textDecoration: 'inherit'}}>Edit</Link>
                </button>
                {/* &nbsp;|&nbsp; */}
                <DeleteButton
                  pet={pet}
                  successCallback={() => {
                    removeFromDom(pet._id)
                    socket.emit('adopt', {_id: pet._id})
                  }}
                  hideName={true}
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
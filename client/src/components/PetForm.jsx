import React, { useState } from 'react'
import axios from 'axios'

const PetForm = (props) => {
  const { onSubmitProp, pet, setPet, submitText } = props

  const onSubmitHandler = e => {
    e.preventDefault()
    onSubmitProp()
  }

  return (
    <form onSubmit={onSubmitHandler}>
      <label>Name:</label>
      { props.validationErrors.name && <p className='text-danger'>{props.validationErrors.name.message}</p> }
      <input type="text" value={pet.name} onChange={(e) => setPet({...pet, name: e.target.value})} className="form-control mb-2"/>
      <label>Type:</label>
      { props.validationErrors.type && <p className='text-danger'>{props.validationErrors.type.message}</p> }
      <input type="text" value={pet.type} onChange={(e) => setPet({...pet, type: e.target.value})} className="form-control mb-2"/>
      <label>Description:</label>
      { props.validationErrors.description && <p className='text-danger'>{props.validationErrors.description.message}</p> }
      <input type="text" value={pet.description} onChange={(e) => setPet({...pet, description: e.target.value})} className="form-control mb-2"/>
      <div className="number mb-2">
        <label>Number of Skills:</label>
        <input type="number" value={pet.skillCount} onChange={(e) => setPet({...pet, skillCount: e.target.value})} className="form-control" name="skillCount" min="0" max="3" />
      </div>
      <input type="submit" value={submitText} className="btn btn-primary" />
    </form>
  )
}

export default PetForm
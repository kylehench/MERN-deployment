import React from 'react'

const PetForm = (props) => {
  const { onSubmitProp, pet, setPet, submitText } = props

  const onSubmitHandler = e => {
    e.preventDefault()
    onSubmitProp()
  }

  return (
    <form onSubmit={onSubmitHandler} className='card p-4'>
      <div className='d-flex'>
        <div className='me-4 flex-fill'>
          <label>Pet Name:</label>
          { props.validationErrors.name && <p className='text-danger'>{props.validationErrors.name.message}</p> }
          <input type="text" value={pet.name} onChange={(e) => setPet({...pet, name: e.target.value})} className="form-control mb-2"/>
          <label>Pet Type:</label>
          { props.validationErrors.type && <p className='text-danger'>{props.validationErrors.type.message}</p> }
          <input type="text" value={pet.type} onChange={(e) => setPet({...pet, type: e.target.value})} className="form-control mb-2"/>
          <label>Pet Description:</label>
          { props.validationErrors.description && <p className='text-danger'>{props.validationErrors.description.message}</p> }
          <input type="text" value={pet.description} onChange={(e) => setPet({...pet, description: e.target.value})} className="form-control mb-2"/>
        </div>
        <div className='flex-fill'>
          <div>Skills (optional):</div>
          <label>Skill 1:</label>
          <input type="text" value={pet.skills[0]} onChange={(e) => setPet({...pet, skills: [e.target.value, ...pet.skills.slice(1,3)]})} className="form-control mb-2"/>
          <label>Skill 2:</label>
          <input type="text" value={pet.skills[1]} onChange={(e) => setPet({...pet, skills: [pet.skills[0], e.target.value, pet.skills[2]]})} className="form-control mb-2"/>
          <label>Skill 3:</label>
          <input type="text" value={pet.skills[2]} onChange={(e) => setPet({...pet, skills: [...pet.skills.slice(0,2), e.target.value]})} className="form-control mb-2"/>
        </div>
      </div>
      <div>
        <input type="submit" value={submitText} className="btn btn-primary" />
      </div>
    </form>
  )
}

export default PetForm
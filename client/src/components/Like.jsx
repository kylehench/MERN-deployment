import React, { useState } from 'react'
import axios from 'axios'

const Like = (props) => {
  const { pet, setPet } = props
  const [ likeStatus, setLikeStatus ] = useState(false)

  const clickHandler = () => {
    axios.post(`http://localhost:8000/api/pets/${pet._id}/like`, {likeCount: pet.likeCount+1})
      .then(res => {
        console.log(res.data)
        setPet({...pet, likeCount: pet.likeCount+1})
        setLikeStatus(true)
      })
      .catch(err => console.log(err))
  }
  
  return (
    <div className='d-flex'>
      <div className="d-flex justify-content-center">
        <div className='me-2 py-1 px-2 text text-primary border d-flex justify-content-center' style={{borderRadius: '20px', minWidth: '33px'}}><b>{pet.likeCount} like{pet.likeCount!==1 && <>s</>}</b></div>
      </div>
      <button 
        className={`btn btn-sm ${!likeStatus ? 'btn-primary' : 'btn-outline-primary disabled shadow-none'}`}
        onClick={() => clickHandler()}
      >Like</button>
    </div>
  )
}

export default Like
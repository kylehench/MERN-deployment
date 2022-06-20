import React, { useState } from 'react'
import axios from 'axios'

const Like = (props) => {
  const [pet, setPet] = useState(props.pet)
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
    <td className='py-2 d-flex'>
      <div className="d-flex justify-content-center" style={{width: '45px'}}>
        <div className='me-2 p-1 text text-primary border d-flex justify-content-center' style={{borderRadius: '50%', minWidth: '33px'}}><b>{pet.likeCount}</b></div>
      </div>
      <button 
        className={`btn btn-sm ${!likeStatus ? 'btn-primary' : 'btn-outline-primary disabled shadow-none'}`}
        onClick={() => clickHandler()}
      >Like</button>
    </td>
  )
}

export default Like
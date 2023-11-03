'use client'
import React from 'react'
import { useState } from 'react'

const UpdateUsername = () => {
  const [show, changeShow] = useState(false)
  const [newUsername, changeNewUsername] = useState('')

  const showForm = (e) => {
    changeShow(!show)
  }

  const hideForm = (e) => {
    changeShow(!show)
  }

  const onChange = (e) => {
    changeNewUsername(e.target.value)
  }

  const onSubmit = (e) => {
    e.preventDefault()
    fetch(`${process.env.NEXT_PUBLIC_HOSTNAME}/api/users`, {
      method: "PUT",
      body: JSON.stringify({username: newUsername})
    })
    .then(res => {
      // redirect to new username page
    })
  }



  return (
    <div>
      {!show && <button onClick={showForm}>Edit username</button>}
      {show && <form onSubmit={onSubmit}><input value={newUsername} onChange={onChange} placeholder='Enter new username'/></form>}
      {show && <button onClick={hideForm}>Cancel</button>}
    </div>
  )
}

export default UpdateUsername
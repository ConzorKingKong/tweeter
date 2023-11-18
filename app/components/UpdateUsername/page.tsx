'use client'
import React from 'react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

const UpdateUsername = () => {
  const router = useRouter()
  const [show, changeShow] = useState(false)
  const [newUsername, changeNewUsername] = useState('')

  const showForm = () => {
    changeShow(!show)
  }

  const hideForm = () => {
    changeShow(!show)
  }

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    changeNewUsername(e.target.value)
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    fetch(`${process.env.NEXT_PUBLIC_HOSTNAME}/api/users`, {
      method: "PUT",
      body: JSON.stringify({username: newUsername})
    })
    .then(res => {
      // redirect to new username page
      router.push(`/${newUsername}`)
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
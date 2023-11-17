'use client'
import React from 'react'
import { useSession } from 'next-auth/react'
import { useRouter, usePathname } from 'next/navigation'

const UserMenu = () => {
  const router = useRouter()
  const session = useSession()

  const onClick = () => {
    fetch(`${process.env.NEXT_PUBLIC_HOSTNAME}/api/users`, {
      method: "delete",
      body: JSON.stringify({id: session.data.session.user.id})
    }).then(res => {
      // double check that session is deleted properly
      router.push("/")
    })
  }


  if (session.data === null) {
    return (<div></div>)
  }


  return (
   <div className="dropdown dropdown-end">
      <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          ...
        </div>
      </label>
      <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
        <li><button onClick={onClick}>Delete User</button></li>
      </ul>
    </div>
  )
}

export default UserMenu
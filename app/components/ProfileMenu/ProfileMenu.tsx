import React from 'react'
import Link from 'next/link'

const ProfileMenu = (props) => {
  return (
    <div className="dropdown dropdown-end">
      <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img src={props.image} />
        </div>
      </label>
      <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
        <li><Link href={props.href} className="justify-between">Profile</Link></li>
        <li><Link href="/api/auth/signout">Logout</Link></li>
      </ul>
    </div>
  )
}

export default ProfileMenu

'use client'
import Link from 'next/link'
import React from 'react'
import { useSession } from 'next-auth/react'
import ProfileMenu from '../ProfileMenu/ProfileMenu'

const Titlebar = () => {

  const session = useSession()

  let href = '/'

  if (session.status === "authenticated") {
    href = `/${session.data.session.user.username}`
  }

  return (
    <div className="flex justify-between p-4" >
      <Link href="/">Homepage</Link>
      <div className="flex justify-between">
        { session.status === 'unauthenticated' && <Link href="api/auth/signin">Sign in</Link> }
        { session.status === 'authenticated' && <ProfileMenu href={href} image={session.data.session.user.image } /> }
      </div>
    </div>
  )
}

export default Titlebar
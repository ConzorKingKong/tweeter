
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


  // the old username seems to get cached in the profile link here after updating
  // this needs to be fixed later
  return (
    <div className="flex justify-between p-4" >
      <Link href="/">Home</Link>
      <div className="flex justify-between">
        { session.status === 'unauthenticated' && <Link href="api/auth/signin">Sign in</Link> }
        { session.status === 'authenticated' && <ProfileMenu href={href} image={session.data.session.user.image } /> }
      </div>
    </div>
  )
}

export default Titlebar
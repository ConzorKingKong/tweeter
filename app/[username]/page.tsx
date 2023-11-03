import React from 'react'
import Feed from '../components/Feed/Feed'
import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]/route'
import UpdateUsername from '../components/UpdateUsername/page'

interface Props {
  params: {username: string}
}

const userPage = async ({ params: {username} }: Props) => {
  const call = await fetch(`${process.env.HOSTNAME}/api/users/${username}`, {cache: 'no-store'})
  const user = await call.json()

  let renderEdit = false

  const session = await getServerSession(authOptions)

  if (session === null) {
    renderEdit = false
  } else if (session && session.session.user.username === username) {
    renderEdit = true
  }

  return (
    <div>
      <div>
        <div>
          <div className="flex flex-row">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img src={user.image} />
            </div>
          </label>
            <p>{user.username}</p>
          </div>
          {renderEdit && <UpdateUsername />}
        </div>
        <Feed data={user.Tweets} />
      </div>
    </div>
  )
}

export default userPage
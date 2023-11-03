import React from 'react'
import { redirect } from 'next/navigation'
import { useSession } from 'next-auth/react'

interface TweetMenuProps {
  id: string,
  username: string | undefined
}

const TweetMenu = (props: TweetMenuProps) => {

  const onClick = () => {
    fetch(`${process.env.NEXT_PUBLIC_HOSTNAME}/api/tweets`, {
      method: "delete",
      body: JSON.stringify({id: props.id})
    }).then(res => {
      redirect("/home")
    })
  }

  const session = useSession()

  if (session.data === null) {
    return (<div></div>)
  }

  if (session.data && props.username !== session.data.session.user.username) {
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
        <li><button onClick={onClick}>Delete tweet</button></li>
      </ul>
    </div>
  )
}

export default TweetMenu
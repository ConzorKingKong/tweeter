'use client'
import React from 'react'
import {useState, useEffect} from 'react'
import { useSession } from 'next-auth/react'
import Feed from './components/Feed/Feed'

export default function Home() {
  const [postContent, setPostContent] = useState("")

  const [data, setData] = useState([])

  const session = useSession()

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_HOSTNAME}/api/tweets`)
      .then(res => res.json())
      .then(data => {
        setData(data)
  })
  }, [])

  const onChange = (e: any) => {
    setPostContent(e.target.value)
  }

  const onSubmit = async (e: any) => {
    e.preventDefault()
    const call = await fetch(`${process.env.NEXT_PUBLIC_HOSTNAME}/api/tweets`, {
      method: "POST",
      body: JSON.stringify({content: postContent})
    })
    const body = await call.json()
    // redirect to comment page
    // shouldn't be necessary when redirect is implimented
    setPostContent("")
  }

  return (
    <div className="">
      {session.status === "authenticated" && <div>
        <div>
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img src={session.status !== "loading" ? session.data.session.user.image : "https://cdn.vectorstock.com/i/preview-1x/66/14/default-avatar-photo-placeholder-profile-picture-vector-21806614.jpg"} />
            </div>
          </label>
        </div>
        <div>
          <form
          onSubmit={onSubmit}
          className="flex justify-between"
          >
            <input 
            placeholder="Put your post here"
            onChange={onChange}
            value={postContent}
            className="text-white w-full"
            />
            <button className="self-end">Post</button>
          </form>
        </div>
      </div>}
      <div>
        <Feed data={data}></Feed>
        {data[0] === undefined && <p>No one has tweeted yet. Try signing up and creating a tweet!</p>}
      </div>
    </div>
  )
}

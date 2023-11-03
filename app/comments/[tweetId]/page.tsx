'use client'
import React from 'react'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import Tweet from '@/app/components/Tweets/Tweets'
import { useSession } from 'next-auth/react'

const Comments = () => {
  const [comment, updateComment] = useState("")

  const session = useSession()

  const onChange = (e) => {
    updateComment(e.target.value)
  }

  const [tweet, setTweet] = useState({Replies: []}) 

  const pathname = usePathname()
  const tweetId = pathname.split('/')[2]

  const onSubmit = (e) => {
    e.preventDefault()
    fetch(`${process.env.NEXT_PUBLIC_HOSTNAME}/api/comments`, {
      method: "POST",
      body: JSON.stringify({content: comment, tweetId: tweetId})
    }).then(res => {
      updateComment("")
    })
  }
  
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_HOSTNAME}/api/comments/${tweetId}`)
    .then(res => {
      res.json()
      .then(data => {
        setTweet(data)
      })
    })
  }, [])

  return (
    <div>
      <Tweet tweet={tweet} />
      {session.status === "authenticated" && <div>
        <form
        onSubmit={onSubmit}
        className="flex"
        >
          <input className="text-white w-full" onChange={onChange} value={comment} placeholder='Comment'/>
          <button className="self-end">Post</button>
        </form>
      </div>}
      <div>
        {tweet.Replies.map((comment, i) => {return (<Tweet key={i} tweet={comment} />)})}
      </div>
    </div>
  )
}

export default Comments
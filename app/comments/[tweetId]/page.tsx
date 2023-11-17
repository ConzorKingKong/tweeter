'use client'
import React from 'react'
import { useEffect, useState } from 'react'
import Tweet from '@/app/components/Tweets/Tweets'
import { useSession } from 'next-auth/react'
import { useRouter, usePathname } from 'next/navigation'

const Comments = () => {
  const router = useRouter()
  const [comment, updateComment] = useState("")

  const session = useSession()

  const onChange = (e) => {
    updateComment(e.target.value)
  }

  const [tweet, setTweet] = useState({data: {Replies: []}, render: false}) 

  const pathname = usePathname()
  const tweetId = pathname.split('/')[2]

  const onSubmit = (e) => {
    e.preventDefault()
    fetch(`${process.env.NEXT_PUBLIC_HOSTNAME}/api/comments`, {
      method: "POST",
      body: JSON.stringify({content: comment, tweetId: tweetId})
    }).then(res => {
      res.json()
      .then(data => {
        router.push(`/comments/${data.id}`)
      })
    })
  }
  
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_HOSTNAME}/api/comments/${tweetId}`)
    .then(res => {
      res.json()
      .then(data => {
        if (data.id) {
          setTweet({data: data, render: true})
        } else {
          setTweet({data: data, render: false})
        }
      })
    })
  }, [])

  if (tweet.render) {
    return (
      <div>
        <Tweet tweet={tweet.data} />
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
          {tweet.data.Replies.map((comment, i) => {return (<Tweet key={i} tweet={comment} />)})}
        </div>
      </div>
    )
  } else {
    return (
      <p>Tweet does not exist</p>
    )
  }
}

export default Comments
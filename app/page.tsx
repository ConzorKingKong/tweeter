'use client'
import React, {useState, useEffect} from 'react'
import { useSession } from 'next-auth/react'
import Feed from './components/Feed/Feed'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { TweetProps } from './components/Tweets/Tweets'

export default function Home() {
  const router = useRouter()
  const [postContent, setPostContent] = useState("")

  const [data, setData] = useState<TweetProps[]>([])

  const session = useSession()

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_HOSTNAME}/api/tweets`)
      .then(res => res.json())
      .then((data: TweetProps[]) => {
        setData(data)
  })
  }, [])

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPostContent(e.target.value)
  }

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const call = await fetch(`${process.env.NEXT_PUBLIC_HOSTNAME}/api/tweets`, {
      method: "POST",
      body: JSON.stringify({content: postContent})
    })
    const body = await call.json()
    router.push(`/comments/${body.id}`)
    setPostContent("")
  }

  return (
    <div className="w-6/12">
      {session.status === "authenticated" && 
          <form
          onSubmit={onSubmit}
          className="flex justify-between flex-col"
          >
            <div className="flex">
              <Link href={`/${session.data.session.user.username}`}>
                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                  <div className="w-10 rounded-full">
                    <img src={session.data.session.user.image || "https://cdn.vectorstock.com/i/preview-1x/66/14/default-avatar-photo-placeholder-profile-picture-vector-21806614.jpg"} />
                  </div>
                </label>
              </Link>
              <textarea
              placeholder="Put your post here"
              onChange={onChange}
              value={postContent}
              className="text-white w-full resize-none rounded-lg p-1"
              maxLength={191}
              />
            </div>
            <button className="self-end w-2/12 border-solid border-2 rounded-lg p-0.5 mt-2">Post</button>
          </form>
      }
      <div>
        {data[0] !== undefined && <Feed data={data}></Feed>}
        {data[0] === undefined && <p>No one has tweeted yet. Try signing up and creating a tweet!</p>}
      </div>
    </div>
  )
}

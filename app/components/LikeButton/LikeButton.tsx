'use client'
import { useSession } from 'next-auth/react'
import React, { MouseEvent } from 'react'
import { useState, useEffect } from 'react'

interface LikeProps {
  id: string,
  likes: number
}

const LikeButton = (props: LikeProps) => {
  const [likeStatus, setStatus] = useState({liked: false, likes: props.likes})

  const session = useSession()

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_HOSTNAME}/api/like/${props.id}`)
    .then(res => {
      res.json()
      .then(data => {
        if (data && data.id) {
          setStatus({likes: props.likes, liked: true})
        }
      })
    })
  }, [])


  const onClick = () => {
    if (session.status !== "authenticated") return
    if (likeStatus.liked === false) {
      fetch(`${process.env.NEXT_PUBLIC_HOSTNAME}/api/like`, {
        method: "POST",
        body: JSON.stringify({id: props.id})
      }).then(res => {
        setStatus({likes: likeStatus.likes + 1, liked: true})
      })
    } else if (likeStatus.liked) {
      fetch(`${process.env.NEXT_PUBLIC_HOSTNAME}/api/like`, {
        method: "DELETE",
        body: JSON.stringify({id: props.id})
      }).then(res => {
        setStatus({likes: likeStatus.likes - 1, liked: false})
      })
    }
  }

  return (
    <div>
      {likeStatus.liked === false && <button className="border-solid border-2" onClick={onClick}>Like {likeStatus.likes}</button>}
      {likeStatus.liked === true && <button className="border-solid border-2" onClick={onClick}>Liked {likeStatus.likes}</button>}
    </div>
  )
}

export default LikeButton
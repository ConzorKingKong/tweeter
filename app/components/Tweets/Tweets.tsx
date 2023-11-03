'use client'
import React, {useState} from 'react'
import Link from 'next/link'
import Image from 'next/image'
import LikeButton from '../LikeButton/LikeButton'
import TweetMenu from '../TweetMenu/TweetMenu'

interface TweetProps {
  tweet: {
    id: string,
    content: string,
    createdAt: Date,
    creatorId: string,
    parentTweetId: null | string,
    User: {
      image: string,
      username: string
    },
    _count: {
      Likes: number
    }
  }
}

const Tweet = (props: TweetProps) => {
  let href = ""
  let image = ""

  if (props.tweet.User) {
    image = props.tweet.User.image
    href = `/${props.tweet.User.username}`
  } else {
    image = "https://cdn.vectorstock.com/i/preview-1x/66/14/default-avatar-photo-placeholder-profile-picture-vector-21806614.jpg"
    href = '/'
  }

  return (
    <div className="flex flex-col  border-solid border-2">
      <div className='flex flex-row items-center'>
        <Link href={href}>
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img src={image} />
            </div>
          </label>
        </Link>
        <Link href={href}>{props.tweet.User && props.tweet.User.username}</Link>
        { props.tweet.User && <TweetMenu id={props.tweet.id} username={props.tweet.User.username || undefined} />}
      </div>
      <div>
        <Link className="flex flex-row" href={"/comments/" + props.tweet.id}> 
          <div>
            <p>{props.tweet.content}</p>
          </div>
        </Link>
      </div>
      <LikeButton id={props.tweet.id} likes={props.tweet._count ? props.tweet._count.Likes : 0} />
    </div>
  )
}

export default Tweet
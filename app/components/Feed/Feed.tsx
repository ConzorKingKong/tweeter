import React, { useEffect, useState } from 'react'
import Tweet from '../Tweets/Tweets'

interface FeedProps {
  data: [{
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
  }]
}

const Feed = (props: FeedProps) => {

  return (
    <div>
      {props.data && <ul>
        {props.data.map((post, i) => {return (<Tweet key={i} tweet={post}/>)})}
      </ul>}
    </div>
  )
}

export default Feed
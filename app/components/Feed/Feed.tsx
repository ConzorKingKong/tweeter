import React, { useEffect, useState } from 'react'
import Tweet from '../Tweets/Tweets'
import { TweetProps } from '../Tweets/Tweets'

interface FeedProps {
  data: TweetProps[]
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
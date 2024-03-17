'use client';
import React, { useEffect, useState } from 'react';
import Feed from '../components/Feed/Feed';
import UserMenu from '../components/UserMenu/UserMenu';
import { useSession } from 'next-auth/react';
import Modal from '../components/Modal/Modal';
import { TweetProps } from '../components/Tweets/Tweets';

interface Props {
  params: { username: string };
}

interface User {
  username: string;
  image: string;
  Tweets: TweetProps[];
}

const UserPage = ({ params: { username } }: Props) => {
  const [user, setUser] = useState<User | null>(null);
  const session = useSession();

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_HOSTNAME}/api/users/${username}`, {
      cache: 'no-store',
    })
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
      });
  }, []);

  return (
    <div className="w-6/12">
      <Modal />
      {!user && <p>Loading...</p>}
      {user && (
        <div>
          <div>
            <div className="flex flex-row justify-between">
              <div className="flex items-center">
                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                  <div className="w-10 rounded-full">
                    <img src={user.image} />
                  </div>
                </label>
                <p>{user.username}</p>
              </div>
              {session.status === 'authenticated' &&
                session.data.session.user.username === user.username && (
                  <div>
                    <UserMenu />
                  </div>
                )}
            </div>
          </div>
          <Feed data={user.Tweets} />
        </div>
      )}
    </div>
  );
};

export default UserPage;

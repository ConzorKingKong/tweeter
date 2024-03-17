'use client';
import React from 'react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const Modal = (props: any) => {
  const router = useRouter();
  const [newUsername, changeNewUsername] = useState('');
  const [error, setError] = useState(false);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    changeNewUsername(e.target.value.replace(/\s/g, ''));
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetch(`${process.env.NEXT_PUBLIC_HOSTNAME}/api/users`, {
      method: 'PUT',
      body: JSON.stringify({ username: newUsername }),
    }).then((res) => {
      if (!res.ok) {
        // username already exists
        setError(true);
        return;
      }
      // redirect to new username page
      router.push(`/${newUsername}`);
    });
  };

  return (
    <div>
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Update your username</h3>
          {error && <p>Username already exists</p>}
          <form onSubmit={onSubmit}>
            <input
              value={newUsername}
              onChange={onChange}
              placeholder="Enter new username"
            />
            <button className="btn">Update</button>
          </form>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default Modal;

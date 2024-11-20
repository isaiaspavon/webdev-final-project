"use client";
import { useState, ChangeEvent, FormEvent } from 'react';
import Card from './Card'; 
import Button from './Button';
import styles from './RoommateForm.module.css'; 
import { useRouter } from 'next/navigation';

type User = {
   id: number;
   name: string;
   username: string;
   description: string;
   imageUrl: string;
};
 
type SignupProps = {
   onAddUser: (user: User) => void;
};

export default function SignupX({ onAddUser }: SignupProps) {
   const [name, setName] = useState('');
   const [username, setUsername] = useState('');
   const [description, setDescription] = useState('');
   const [imageUrl, setImageUrl] = useState('');
 
   const nameChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
     setName(event.target.value);
   };
 
   const usernameChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
     setUsername(event.target.value);
   };
 
   const descriptionChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
     setDescription(event.target.value);
   };
 
   const imageChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
     setImageUrl(event.target.value);
   };

   const handleSubmit = (event: React.FormEvent) => {
     event.preventDefault();

     if ( !name || !username || !description || !imageUrl ) {
         alert("A username and password are required!");
         return;
     }

     const newUser: User = {
         id: Math.random(), 
         name,
         username,
         description,
         imageUrl,
       };

     onAddUser(newUser);

     setName('');
     setUsername('');
     setDescription('');
     setImageUrl('');
   };

     return (
      <div className={styles.flexCenter}>
      <Card className={styles.card}>
        <h1 className={styles.signupTitle}>Signup</h1>
        <form className={styles.form} onSubmit={handleSubmit}>
          <label htmlFor="name">Name</label>
          <input
            className={styles.inputField}
            id="name"
            type="text"
            placeholder="Enter your name"
            onChange={nameChangeHandler}
            value={name}
          />
          <label htmlFor="username">Username</label>
          <input
            className={styles.inputField}
            id="username"
            type="text"
            placeholder="Enter your username"
            onChange={usernameChangeHandler}
            value={username}
          />
          <label htmlFor="description">Description</label>
          <input
            className={styles.inputField}
            id="description"
            type="text"
            placeholder="Enter your description"
            onChange={descriptionChangeHandler}
            value={description}
          />
          <label htmlFor="imageLink">Image Link</label>
          <input
            className={styles.inputField}
            id="imageLink"
            type="url"
            placeholder="Enter image URL"
            onChange={imageChangeHandler}
            value={imageUrl}
          />
          <Button type="submit">Enter Button</Button>
        </form>
      </Card>
    </div>
       );
 } 
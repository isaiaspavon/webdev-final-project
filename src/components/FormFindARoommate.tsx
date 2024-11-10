/*import { useState, ChangeEvent, FormEvent } from 'react';
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

export default function Signup({ onAddUser }: SignupProps) {
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

       return (
           <div className="flex justify-center items-center min-h-screen bg-gray-100 py-3">
           <Card className={`${styles.input} w-full max-w-lg p-3 bg-white shadow-md rounded-md`}>
             <h1 className="text-4xl font-bold mb-6 text-center">Signup</h1>
             <form onSubmit={handleSubmit}>
               <label htmlFor="name">Name</label>
               <input className="p-2 border border-gray-300 rounded-md text-base focus:outline-none focus:border-blue-500"
                 id="name"
                 type="text"
                 placeholder="Enter your name"
                 onChange={nameChangeHandler}
                 value={name}
               />
               <label htmlFor="username">Username</label>
               <input className="p-2 border border-gray-300 rounded-md text-base focus:outline-none focus:border-blue-500"
                 id="username"
                 type="text"
                 placeholder="Enter your username"
                 onChange={usernameChangeHandler}
                 value={username}
               />
               <label htmlFor="description">Description</label>
               <input className="p-2 border border-gray-300 rounded-md text-base focus:outline-none focus:border-blue-500"
                 id="description"
                 type="description"
                 placeholder="Enter your description"
                 onChange={descriptionChangeHandler}
                 value={description}
               />
               <label htmlFor="imageLink">Image Link</label>
               <input className="border border-gray-300 rounded-md text-base focus:outline-none focus:border-blue-500"
                 id="imageLink"
                 type="url"
                 placeholder="Enter image URL"
                 onChange={imageChangeHandler}
                 value={imageUrl}
               />
         
               <Button type="submit">Sign Up</Button>
             </form>
           </Card>
           </div>
         );
   }
} */

   import React from "react";
   import { useState, ChangeEvent, FormEvent } from 'react';
   import Button from './Button'; // Assuming you have a Button component
   import Card from './Card'; // Assuming the Card component is available and imported
   
   type SignupProps = {
     onAddUser: (user: User) => void;
   };
   
   type User = {
     id: number;
     name: string;
     username: string;
     description: string;
     imageUrl: string;
   };
   
   const Signup: React.FC<SignupProps> = ({ onAddUser }) => {
     const [name, setName] = useState('');
     const [username, setUsername] = useState('');
     const [description, setDescription] = useState('');
     const [imageUrl, setImageUrl] = useState('');
   
     const handleChange = (setter: React.Dispatch<React.SetStateAction<string>>) => (event: ChangeEvent<HTMLInputElement>) => {
       setter(event.target.value);
     };
   
     const handleSubmit = (event: FormEvent) => {
       event.preventDefault();
   
       if (!name || !username || !description || !imageUrl) {
         alert("All fields are required!");
         return;
       }
   
       const newUser: User = {
         id: Math.random(),
         name,
         username,
         description,
         imageUrl,
       };
   
       onAddUser(newUser); // Add the new user via the parent handler
       setName('');
       setUsername('');
       setDescription('');
       setImageUrl('');
     };
   
     return (
       <div className="flex justify-center items-center min-h-screen bg-gray-100 py-3">
         <Card className="w-full max-w-lg p-3 bg-white shadow-md rounded-md">
           <h1 className="text-4xl font-bold mb-6 text-center">Signup</h1>
           <form onSubmit={handleSubmit}>
             <div className="mb-4">
               <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
               <input
                 className="p-2 border border-gray-300 rounded-md text-base focus:outline-none focus:border-blue-500 w-full"
                 id="name"
                 type="text"
                 placeholder="Enter your name"
                 onChange={handleChange(setName)}
                 value={name}
               />
             </div>
             <div className="mb-4">
               <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
               <input
                 className="p-2 border border-gray-300 rounded-md text-base focus:outline-none focus:border-blue-500 w-full"
                 id="username"
                 type="text"
                 placeholder="Enter your username"
                 onChange={handleChange(setUsername)}
                 value={username}
               />
             </div>
             <div className="mb-4">
               <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
               <input
                 className="p-2 border border-gray-300 rounded-md text-base focus:outline-none focus:border-blue-500 w-full"
                 id="description"
                 type="text"
                 placeholder="Enter your description"
                 onChange={handleChange(setDescription)}
                 value={description}
               />
             </div>
             <div className="mb-4">
               <label htmlFor="imageLink" className="block text-sm font-medium text-gray-700">Image Link</label>
               <input
                 className="p-2 border border-gray-300 rounded-md text-base focus:outline-none focus:border-blue-500 w-full"
                 id="imageLink"
                 type="url"
                 placeholder="Enter image URL"
                 onChange={handleChange(setImageUrl)}
                 value={imageUrl}
               />
             </div>
             <Button type="submit" className="w-full mt-4 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">
               Sign Up
             </Button>
           </form>
         </Card>
       </div>
     );
   };
   
   export default Signup;
   

   /*
   import { useState, ChangeEvent, FormEvent } from 'react';
   import Button from './Button'; // Assuming you have a Button component
   import Card from './Card'; // Assuming the Card component is available and imported
   import styles from './RoommateForm.module.css'; 
   import { useRouter } from 'next/navigation';
   
   type User = {
     id: number;
     name: string;
     username: string;
     description: string;
     imageUrl: string;
   };
   
   type FormFindARoommateProps = {
     onAddUser: (user: User) => void;
   };
   
   export default function FormFindARoommate({ onAddUser }: FormFindARoommateProps) {
     const [name, setName] = useState('');
     const [username, setUsername] = useState('');
     const [description, setDescription] = useState('');
     const [imageUrl, setImageUrl] = useState('');
   
     const handleChange = (setter: React.Dispatch<React.SetStateAction<string>>) => (event: ChangeEvent<HTMLInputElement>) => {
       setter(event.target.value);
     };
   
     const handleSubmit = (event: FormEvent) => {
       event.preventDefault();
   
       if (!name || !username || !description || !imageUrl) {
         alert("All fields are required!");
         return;
       }
   
       const newUser: User = {
         id: Math.random(),
         name,
         username,
         description,
         imageUrl,
       };
   
       onAddUser(newUser); // Add the new user via the parent handler
       setName('');
       setUsername('');
       setDescription('');
       setImageUrl('');
     };
   
     return (
       <div className="flex justify-center items-center min-h-screen bg-gray-100 py-3">
         <Card className="w-full max-w-lg p-3 bg-white shadow-md rounded-md">
           <h1 className="text-4xl font-bold mb-6 text-center">Signup</h1>
           <form onSubmit={handleSubmit}>
             <div className="mb-4">
               <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
               <input
                 className="p-2 border border-gray-300 rounded-md text-base focus:outline-none focus:border-blue-500 w-full"
                 id="name"
                 type="text"
                 placeholder="Enter your name"
                 onChange={handleChange(setName)}
                 value={name}
               />
             </div>
             <div className="mb-4">
               <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
               <input
                 className="p-2 border border-gray-300 rounded-md text-base focus:outline-none focus:border-blue-500 w-full"
                 id="username"
                 type="text"
                 placeholder="Enter your username"
                 onChange={handleChange(setUsername)}
                 value={username}
               />
             </div>
             <div className="mb-4">
               <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
               <input
                 className="p-2 border border-gray-300 rounded-md text-base focus:outline-none focus:border-blue-500 w-full"
                 id="description"
                 type="text"
                 placeholder="Enter your description"
                 onChange={handleChange(setDescription)}
                 value={description}
               />
             </div>
             <div className="mb-4">
               <label htmlFor="imageLink" className="block text-sm font-medium text-gray-700">Image Link</label>
               <input
                 className="p-2 border border-gray-300 rounded-md text-base focus:outline-none focus:border-blue-500 w-full"
                 id="imageLink"
                 type="url"
                 placeholder="Enter image URL"
                 onChange={handleChange(setImageUrl)}
                 value={imageUrl}
               />
             </div>
             <Button type="submit" className="w-full mt-4 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">
               Sign Up
             </Button>
           </form>
         </Card>
       </div>
     );
}   
     */
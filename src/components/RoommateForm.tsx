'use client';
import React, { useState } from 'react';

const AddItemForm = () => {
 // Define state for the form fields and response message
 const [fName, setName] = useState('');
 const [briefDescription, setDescription] = useState('');
 const [imageURL, setImage] = useState('');
 const [message, setMessage] = useState('');
 const [loading, setLoading] = useState(false);

 // Handle form submission
 const handleSubmit = async (e: React.FormEvent) => {
   e.preventDefault();

   setLoading(true);
   setMessage(''); // Clear previous messages

   try {
     // Send the POST request to the API route
     const response = await fetch('/api/items', {
       method: 'POST',
       headers: {
         'Content-Type': 'application/json',
       },
       body: JSON.stringify({
         fName,
         briefDescription,
         imageURL,
       }),
     });

     const result = await response.json();

     if (response.ok) {
       setMessage('Item added successfully!');
       setTitle('');
       setDescription('');
       setImage('');
     } else {
       setMessage(result.message || 'Error adding item.');
     }
   } catch (error) {
     setMessage('An error occurred while adding the item.');
     console.error(error);
   } finally {
     setLoading(false);
   }
 };

 return (
   <div>
     <h2>Add New Item</h2>
     <form onSubmit={handleSubmit} className="add-item-form">
       <div>
         <label htmlFor="fName">First Name</label>
         <input
           type="text"
           id="fName"
           value={fName}
           onChange={(e) => setName(e.target.value)}
           required
         />
       </div>
       
       <div>
         <label htmlFor="briefDescription">Description</label>
         <textarea
           id="briefDescription"
           value={briefDescription}
           onChange={(e) => setDescription(e.target.value)}
           required
         />
       </div>
       
       <div>
         <label htmlFor="imageURL">Image URL (optional)</label>
         <input
           type="url"
           id="imageURL"
           value={imageURL}
           onChange={(e) => setImage(e.target.value)}
         />
       </div>

       <button type="submit" disabled={loading}>
         {loading ? 'Submitting...' : 'Submit'}
       </button>
     </form>

     {message && <p className="message">{message}</p>}
   </div>
 );
};

export default AddItemForm;


'use client';

import { useState } from 'react';
import './deleteButton.Module.css';
import Link from "next/link"


interface DeleteButtonProps {
 id: string;
 onDelete: (id: string) => void;
}

const DeleteButtonComponent = ({ id, onDelete }: DeleteButtonProps) => {
 const [isModalOpen, setIsModalOpen] = useState(false);

 // Open the confirmation modal
 const openModal = () => {
   setIsModalOpen(true);
 };

 // Close the confirmation modal
 const closeModal = () => {
   setIsModalOpen(false);
 };

 // Trigger the delete operation
 const handleDelete = () => {
   onDelete(id);  // Pass the item ID to the onDelete function from parent
   closeModal();   // Close modal after deleting
 };

 return (
   <>
     {/* Delete button */}
     <button onClick={openModal} className="delete-button">
       Delete Profile
     </button>

     {/* Confirmation Modal */}
     {isModalOpen && (
       <div className="modal-overlay">
         <div className="modal">
           <h3>Are you sure you want to delete this item?</h3>
           <div className="modal-actions">
             <button onClick={handleDelete} className="confirm-delete">
                <Link href="/" passHref>
                    <span>Yes, Delete</span>
               </Link>
             </button>
             <button onClick={closeModal} className="cancel-delete">
               No, Cancel
             </button>
           </div>
         </div>
       </div>
     )}
   </>
 );
};

export default DeleteButtonComponent;

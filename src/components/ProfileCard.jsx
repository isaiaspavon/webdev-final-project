import React, { useState, useEffect } from 'react';
import './ProfileCard.Module.css'; 
import { useSession } from "next-auth/react";
import Image from "next/image";
import EditItemForm from './editButton';
import DeleteButtonComponent from './deleteButton'; 
import Link from "next/link";




const CardContainer = () => {
  const { data: session, status } = useSession();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editingItemId, setEditingItemId] = useState(null); // Track the item being edited
  const [deletingItemId, setDeletingItemId] = useState(null); // Track the item being deleted



  useEffect(() => {
    const fetchUserData = async () => {
      if (session?.user?.id) {
        try {
          const response = await fetch(`/api/${session.user.id}`);
          if (!response.ok) {
            throw new Error(`Failed to fetch user data: ${response.status}`);
          }
          const data = await response.json();
          setUserData(data);
        } catch (error) {
          console.error("Error fetching user data:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchUserData();
  }, [session]);

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (!session) {
    return (
      <div className="logged-out-container">
        <h1>Please log in to view your profile.</h1>
        <Link href="/" passHref>
          <p>Go to Signup</p>
        </Link>
      </div>
    );
  }

  if (loading) {
    return <p>Loading user data...</p>;
  }

  if (!userData) {
    return <p>No user data available.</p>;
  }

  const { item } = userData;

  //Handle edit
  const handleEditClick = (id) => {
    setEditingItemId(id); //edit
  }

  //Handle close form click
  const handleCloseEditForm = () => {
    setEditingItemId(null); //close
  }

  // Handle Delete item operation
  const handleDeleteItem = async (id) => {
  try {
    const response = await fetch(`/api/items/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      setDeletingItemId(null); // Close the modal
    } else {
      console.log('Failed to delete item');
    }
  } catch (error) {
    console.error('Error deleting item:', error);
  }
};


  return (
    <div className="big-card">
      <div className="left-card">
        <div className="Pfp-card">
            <Image
              className="profile-pic"
              src={item.imageURL}
              alt="User Profile Picture"
              width={100}
              height={100}
              priority
              />
        </div>
        <div className="desc-card">
        <p>{item.briefDescription}</p>
        </div>
      </div>
      <div className="right-cards">
        <div className="top-right-card">
          
          <div className="buttonDiv">
            <button className="editButton" onClick={() => handleEditClick(item._id)}>Edit Profile</button>
            <DeleteButtonComponent
            id={item._id}
            onDelete={handleDeleteItem}
             />
          </div>
          <p>Name: {item.fName} {item.lName}</p>
          <p>Major: {item.major}</p>
          <p>Gender: {item?.gender || "Not Specified"}</p>
          <p>Roommate Preference: {item?.roommatePreference || "No Preference"}</p>
          <p>Degree Level: {item?.degreeLevel || "Not Specified"}</p>
          <p>Pets: {item?.hasPets || "No Pets"}</p>
          <p>Pet Preferences: {item?.mindsPets || "No Preference"}</p>
          <p>Tidiness: {item?.cleanliness || "Not Specified"}</p>
        </div>
      </div>
      {editingItemId && (
        <div className="edit-form-overlay">
          <div className="edit-block">
          <EditItemForm
            itemId={editingItemId}
            onClose={handleCloseEditForm}
          />
          </div>
        </div>
      )}

      {deletingItemId && (
        <div className="delete-confirmation-overlay">
          <div className="delete-confirmation-modal">
            <h3>Are you sure you want to delete this item?</h3>
            <div className="modal-actions">
              <button
                onClick={() => handleDeleteItem(deletingItemId)}
                className="confirm-delete"
              >
                Yes, Delete
              </button>
              <button
                onClick={() => setDeletingItemId(null)}
                className="cancel-delete"
              >
                No, Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CardContainer;

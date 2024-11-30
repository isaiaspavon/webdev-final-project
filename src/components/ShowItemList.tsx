'use client';

import React, { useEffect, useState } from 'react';
import Card from './Card';
import Image from 'next/image';
import styles from './ShowItemLists.module.css';
import { useSession } from 'next-auth/react';

interface Item {
    _id: string;
    fName: string;
    lName: string;
    email: string;
    major: string;
    cleanliness: string;
    degreeLevel: string;
    gender: string;
    roommatePreference: string;
    briefDescription: string;
    hasPets: string;
    mindsPets: string;
    petType?: string;
    imageURL: string;
}

export default function ShowItemsList() {
    const { data: session, status } = useSession();
    const [items, setItems] = useState<Item[]>([]); // All available users
    const [addedItems, setAddedItems] = useState<Item[]>([]); // Roommates for current user
    const [loading, setLoading] = useState(true); // Loading state

    // Fetch roommates for the current user
    useEffect(() => {
        const fetchRoommates = async () => {
            if (!session?.user?.id) return;
        
            try {
                const response = await fetch(`/api/${session.user.id}`);
                if (!response.ok) throw new Error('Failed to fetch user data');
                const userData = await response.json();
        
                console.log('Fetched user data:', userData);
        
                const roommateIDs = Array.isArray(userData.item?.roommates) ? userData.item.roommates : [];
                console.log('Roommate IDs:', roommateIDs);
        
                if (roommateIDs.length > 0) {
                    const roommatePromises = roommateIDs.map((id: string) =>
                        fetch(`/api/roommate/${id}`).then((res) => {
                            if (!res.ok) throw new Error(`Failed to fetch roommate data for ID: ${id}`);
                            return res.json();
                        })
                    );
        
                    const roommateResponses = await Promise.all(roommatePromises);
                    console.log('Fetched roommate details:', roommateResponses);
        
                    // Extract the `data` field from each response
                    const roommateDetails = roommateResponses.map((response) => response.data);
                    setAddedItems(roommateDetails);
                } else {
                    console.error('No roommates found for this user.');
                }
            } catch (error) {
                console.error('Error fetching roommates:', error);
            } finally {
                setLoading(false);
            }
        };
        
    
        if (status === 'authenticated') {
            fetchRoommates();
        }
    }, [session, status]);
    

    // Fetch all users
    useEffect(() => {
        const fetchAllUsers = async () => {
            try {
                const response = await fetch('/api/items');
                if (!response.ok) throw new Error('Failed to fetch all users');
                const data = await response.json();
                setItems(data.items);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchAllUsers();
    }, []);

    // Add a user to the roommate list
    const handleAddItem = async (item: Item) => {
        if (session?.user?.id) {
            try {
                setItems((prevItems) => prevItems.filter((i) => i._id !== item._id));
                setAddedItems((prevAddedItems) => [...prevAddedItems, item]);

                const response = await fetch(`/api/roommate/${session.user.id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ roommates: [item._id] }),
                });

                if (!response.ok) throw new Error('Failed to update user roommates');
            } catch (error) {
                console.error('Error adding roommate:', error);
            }
        }
    };

    // Remove a user from the roommate list
    const handleRemoveItem = async (item: Item) => {
        setAddedItems((prevAddedItems) => prevAddedItems.filter((i) => i._id !== item._id));
        setItems((prevItems) => [...prevItems, item]);
    };

    const handleEmail = (email: string) => {
        window.location.href = `mailto:${email}`;
    };

    return (
        <div>
            <div className={styles.upperCard}>
                {loading ? (
                    <p>Loading roommates...</p>
                ) : addedItems.length > 0 ? (
                    addedItems.map((addedItem) => (
                        <Card key={addedItem._id} className={styles.bigCard}>
                            <Image
                                className={styles.pic}
                                src={addedItem.imageURL}
                                alt={addedItem.email}
                                width={100}
                                height={100}
                                priority
                            />
                            <div className={styles.innerCard}>
                                <div className={styles.userInfo}>
                                    <h2>Name: {addedItem.fName} {addedItem.lName}</h2>
                                    <p>Email: {addedItem.email}</p>
                                    <p>Gender: {addedItem.gender}</p>
                                    <p>Rooming Preference: {addedItem.roommatePreference}</p>
                                    <p>Major: {addedItem.major}</p>
                                    <p>Degree Level: {addedItem.degreeLevel}</p>
                                    <p>Tidiness (1 - 4): {addedItem.cleanliness}</p>
                                    <p>Has Pets: {addedItem.hasPets}</p>
                                    {addedItem.petType && <p>Pet Type: {addedItem.petType}</p>}
                                    <p>Minds Pets: {addedItem.mindsPets}</p>
                                    <div className={styles.desc}>
                                        <p>Description: {addedItem.briefDescription}</p>
                                    </div>
                                </div>
                                <button onClick={() => handleRemoveItem(addedItem)} className={styles.removeButton}>
                                    Remove
                                </button>
                                <button onClick={() => handleEmail(addedItem.email)} className={styles.emailButton}>
                                    Email
                                </button>
                            </div>
                        </Card>
                    ))
                ) : (
                    <p>No roommates added yet.</p>
                )}
            </div>
            <div className={styles.usersContainer}>
                {items.map((item) => (
                    <Card key={item._id} className={styles.bigCard}>
                        <Image
                            className={styles.pic}
                            src={item.imageURL}
                            alt={item.email}
                            width={100}
                            height={100}
                            priority
                        />
                        <div className={styles.innerCard}>
                            <div className={styles.userInfo}>
                                <h2>Name: {item.fName} {item.lName}</h2>
                                <p>Email: {item.email}</p>
                                <p>Gender: {item.gender}</p>
                                <p>Rooming Preference: {item.roommatePreference}</p>
                                <p>Major: {item.major}</p>
                                <p>Degree Level: {item.degreeLevel}</p>
                                <p>Tidiness (1 - 4): {item.cleanliness}</p>
                                <p>Has Pets: {item.hasPets}</p>
                                {item.petType && <p>Pet Type: {item.petType}</p>}
                                <p>Minds Pets: {item.mindsPets}</p>
                                <div className={styles.desc}>
                                    <p>Description: {item.briefDescription}</p>
                                </div>
                            </div>
                            <button onClick={() => handleAddItem(item)} className={styles.addButton}>
                                Add
                            </button>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
}

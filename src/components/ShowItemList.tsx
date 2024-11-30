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

    useEffect(() => {
        const fetchRoommates = async () => {
            if (!session?.user?.id) return;

            try {
                const response = await fetch(`/api/${session.user.id}`);
                if (!response.ok) throw new Error('Failed to fetch user data');
                const userData = await response.json();

                const roommateIDs = Array.isArray(userData.item?.roommates) ? userData.item.roommates : [];

                if (roommateIDs.length > 0) {
                    const roommatePromises = roommateIDs.map((id) =>
                        fetch(`/api/roommate/${id}`).then((res) => {
                            if (!res.ok) throw new Error(`Failed to fetch roommate data for ID: ${id}`);
                            return res.json();
                        })
                    );

                    const roommateDetails = await Promise.all(roommatePromises);
                    const roommateData = roommateDetails.map((res) => res.data);

                    // Remove duplicates
                    const uniqueRoommates = roommateData.filter(
                        (item, index, self) => self.findIndex((t) => t._id === item._id) === index
                    );

                    setAddedItems(uniqueRoommates);
                } else {
                    setAddedItems([]); // Reset if no roommates
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

    // Fetch all users for adding roommates (if needed)
    useEffect(() => {
        const fetchAllUsers = async () => {
            try {
                const response = await fetch('/api/items');
                if (!response.ok) throw new Error('Failed to fetch all users');
                const data = await response.json();

                // Filter out already added roommates from the available users
                const availableUsers = data.items.filter(
                    (item: Item) => !addedItems.some(addedItem => addedItem._id === item._id)
                );
                setItems(availableUsers);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchAllUsers();
    }, [addedItems]); // Re-fetch when `addedItems` change

    // Add a roommate
    const handleAddItem = async (item: Item) => {
        if (session?.user?.id) {
            try {
                // Prevent adding duplicates
                if (addedItems.some((addedItem) => addedItem._id === item._id)) {
                    console.log('This roommate is already added.');
                    return;
                }

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

    // Remove a roommate
    const handleRemoveItem = async (item: Item) => {
        if (session?.user?.id) {
            try {
                setAddedItems((prevAddedItems) => prevAddedItems.filter((i) => i._id !== item._id));
                setItems((prevItems) => [...prevItems, item]);

                const response = await fetch(`/api/roommate/${session.user.id}`, {
                    method: 'DELETE',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ roommateId: item._id }),
                });

                if (!response.ok) throw new Error('Failed to remove roommate');
            } catch (error) {
                console.error('Error removing roommate:', error);
            }
        }
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

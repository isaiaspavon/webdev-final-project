'use client';
import React, { useEffect, useState } from "react";
import Card from "./Card";
import Image from "next/image";
import styles from './ShowItemLists.module.css';

interface Item {
    _id: string;
    fName: string;
    lName: string;
    email: string;
    password: string;
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
    __v: string;
}

export default function ShowItemsList() {
    const [items, setItems] = useState<Item[]>([]); // State for available items
    const [addedItems, setAddedItems] = useState<Item[]>([]); // State for added items (multiple)

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await fetch('/api/items');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setItems(data.items);
            } catch (error) {
                console.log('Error from ShowItemList', error);
            }
        };

        fetchItems();
    }, []);

    // Function to handle adding an item
    const handleAddItem = (item: Item) => {
        // Remove the item from the main list
        setItems((prevItems) => prevItems.filter((i) => i._id !== item._id));
        // Add the item to the addedItems array (maintain previous items)
        setAddedItems((prevAddedItems) => [...prevAddedItems, item]);
    };

    // Function to handle removing an item
    const handleRemoveItem = (item: Item) => {
        setAddedItems((prevAddedItems) => prevAddedItems.filter((i) => i._id !== item._id));
        // Add the item back to the main list (items available for adding)
        setItems((prevItems) => [...prevItems, item]);
    };

    // Function to handle sending an email
    const handleEmail = (email: string) => {
        window.location.href = `mailto:${email}`;
    };

    return (
        <div>
            <div className={styles.upperCard}>
                {/* Map through the addedItems array to display all added items */}
                {addedItems.map((addedItem) => (
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
                                <h2>Name: {addedItem.fName}</h2>
                                <p>Email: {addedItem.email}</p>
                                <p>Gender: {addedItem.gender}</p>
                                <p>Rooming preference: {addedItem.roommatePreference}</p>
                                <p>Major: {addedItem.major}</p>
                                <p>Degree Level: {addedItem.degreeLevel}</p>
                                <p>Tidiness 1 - 4: {addedItem.cleanliness}</p>
                                <p>Do you own a pet: {addedItem.hasPets}</p>
                                <p>If so, what kind: {addedItem.petType}</p>
                                <p>Do you mind pets: {addedItem.mindsPets}</p>
                                <div className={styles.desc}>
                                    <p>Description: {addedItem.briefDescription}</p>
                                </div>
                            </div>
                            {/* Remove button */}
                            <button onClick={() => handleRemoveItem(addedItem)} className={styles.removeButton}>
                                Remove
                            </button>
                            {/* Email button */}
                            <button onClick={() => handleEmail(addedItem.email)} className={styles.emailButton}>
                                Email
                            </button>
                        </div>
                    </Card>
                ))}
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
                                <h2>Name: {item.fName}</h2>
                                <p>Email: {item.email}</p>
                                <p>Gender: {item.gender}</p>
                                <p>Rooming preference: {item.roommatePreference}</p>
                                <p>Major: {item.major}</p>
                                <p>Degree Level: {item.degreeLevel}</p>
                                <p>Tidiness 1 - 4: {item.cleanliness}</p>
                                <p>Do you own a pet: {item.hasPets}</p>
                                <p>If so, what kind: {item.petType}</p>
                                <p>Do you mind pets: {item.mindsPets}</p>
                                <div className={styles.desc}>
                                    <p>Description: {item.briefDescription}</p>
                                </div>
                            </div>
                            <button onClick={() => handleAddItem(item)}>ADD</button>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
}

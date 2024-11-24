'use client';
import { useEffect, useState } from "react";
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
    hasPets: boolean;
    mindsPets: boolean;
    petType?: string;
    imageURL: string;
    __v: string;
}

export default function ShowItemsList() {
    const [items, setItems] = useState<Item[]>([]); // State to store the list of items

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await fetch('/api/items');
                if (!response.ok) {
                    throw new Error('Network response was not ok')
                }
                const data = await response.json();
                setItems(data.items);
            } catch (error) {

                console.log('Error from ShowItemList', error);
            }
        };

        fetchItems();
    }, []);

    return (
        
        <div className={styles.usersContainer}> 
        
            {items.map((item) => (
                <Card key={item._id} className={styles.bigCard}> {/* Add the custom class for card */}
                    <Image className={styles.pic}
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
                        <button>
                            ADD
                        </button>
                    </div>
                </Card>
            ))}
        </div> 
    );
}



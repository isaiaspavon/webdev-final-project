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
                    <Image 
                        src={'https://a.espncdn.com/combiner/i?img=/i/headshots/nfl/players/full/3918298.png'} 
                        alt={item.email} 
                        width={100} 
                        height={100}
                        priority
                    />
                    <div className={styles.innerCard}>
                        <div className={styles.userInfo}>
                            <h2>Name: {item.fName}</h2>
                            <p>Description: {item.briefDescription}</p>
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



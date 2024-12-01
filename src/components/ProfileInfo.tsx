'use client';
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useParams } from "react-router"
import './ProfileCard.Module.css'; 

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

export default function GetSpecInfo() {
    const[item, setItem] = useState<Item |null>(null);
    const params = useParams();
    const id = params?.id as string;

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await fetch('/api/items/${id}'); 
                if(!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                console.log("DATA::::");
                console.log(data);
                setItem(data.item);
            } catch (error) {
                console.log('Error from ShowItemDetails');
            }
        };

        if (id) {
            fetchItems();
        }
    }, [id]);

    return (
        <div className="big-card">
            <div className="left-card">
                <div className="Pfp-card">
                    <img src={item?.imageURL} alt="profile picture" className="profile-pic" />
                </div>
                <div className="desc-card">
                    <p>{item?._id}</p>
                </div>
            </div>
            <div className="right-cards">
                <div className="top-right-card">
                    <p>Name : {item?.fName} {item?.lName}</p>
                    <p>Major : {item?.major}</p>
                    <p>Gender : {item?.gender}</p>
                    <p>Roommate Preference : {item?.roommatePreference}</p>
                    <p>Degree Level : {item?.degreeLevel}</p>
                </div>
                <div className="bottom-right-card">
                    <p>Pets : {item?.hasPets}</p>
                    <p>Pet Preferences : {item?.mindsPets}</p>
                    <p>Tidiness : {item?.cleanliness}</p>
                </div>
            </div>
        </div>

    );
}
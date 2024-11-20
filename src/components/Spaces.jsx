import React from 'react';
import './Spaces.Module.css';
import Property from './propertyCard.tsx';

//<Property
//imgSrc=""
//name=""
//address=""
// />

const Container = () => {
    return (
        <div className="outside-card">
        <div className="inside-card-1">

        </div>
        <div className="inside-card-1">
            <Property 
            imgSrc="https://www.thelodgeofathens.com/wp-content/uploads/2024/04/the-lodge-exterior-0003-1.jpg"
            name="The Lodge of Athens"
            address="211 North Ave, Athens, USA"
            />
            <Property
            imgSrc="https://ramblerathens.com/wp-content/uploads/2023/04/The-Wright-House.jpg"
            name="Wright House"
            address="980 S Lumpkin St, Athens, GA 30605"
            />
            <Property 
            imgSrc="https://ramblerathens.com/wp-content/uploads/2023/03/overview-of-the-standard--1200x597.jpg"
            name="The Standard"
            address="600 N Thomas St, Athens, GA 30601"
            />
            <Property
            imgSrc="https://www.retreatonmilledge.com/wp-content/uploads/2023/09/index-header3.jpg"
            name="The Retreat"
            address="2555 South Milledge Ave, Athens, GA 30605"
            />
            <Property
            imgSrc="https://themarkathens.landmark-properties.com/wp-content/uploads/2023/06/index-hero.jpg"
            name="The Mark"
            address="130 Hickory St, Athens, GA 30601"
            />
            <Property 
            imgSrc="https://lvcollective.com/wp-content/uploads/2023/02/Rambler-Athens-Exterior-Hero-Dusk-2560x1440.jpg"
            name="Rambler"
            address="558 W Broad St, Athens, GA 30601"
            />
            <Property 
            imgSrc="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8GVdG-QS6GVPAHeDK6gXj-m-ILQNh9ELRjw&s"
            name="Georgia Heights"
            address="150 W Broad St, Athens, GA 30601"
            />
        </div>
        </div>
    );
};

export default Container;
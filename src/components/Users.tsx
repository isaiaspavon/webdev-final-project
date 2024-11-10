import React from "react";
import User from "./User";
import styles from './Users.module.css';

type UserType = {
    id: number;
    name: string;
    username: string; 
    description: string;
    imageUrl: string;
}

interface UsersProps {
    users: UserType[];  
}

export default function Users({ users }: UsersProps) {
    return (
        <div className={styles.bigCard}>
            <div className={styles.usersContainer}>
                {users.map(user => (
                <User key = {user.id} user = {user} />
                ))}
            </div>
        </div>
    );
}
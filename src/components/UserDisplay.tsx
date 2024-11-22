"use client";

import { useState } from "react";
import Users from './Users';
import Signup from './FormFindARoommate'
import SignupX from "./FormFindARoommate";

type User = {
  id: number;
  name: string;
  email: string; 
  description: string;
  imageUrl: string;
}

const USERS_INIT: User[] = [
  {
    id: 1,
    name: 'John Cena',
    email: 'j.cena20@gmail.com',
    description: 'wwe wrestler ',
    imageUrl: 'https://manofmany.com/_next/image?url=https%3A%2F%2Fapi.manofmany.com%2Fwp-content%2Fuploads%2F2024%2F03%2FJohn-Cena.jpg&w=1200&q=75',
  },
  {
    id: 2,
    name: 'Gojo Satoru',
    email: 'jujutsu@gmail.com',
    description: 'The honored one',
    imageUrl: 'https://steamuserimages-a.akamaihd.net/ugc/1774958837149499612/6ED09389C73506B5717D0638D5615670A5FA4A04/?imw=512&&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false',
  },
  {
    id: 3,
    name: 'Josh Allen',
    email: 'billsQB@gmail.com',
    description: 'QB for Buffalo',
    imageUrl:'data:image/jpeg;base64,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',
  }
];

export default function Home() {

  // initialize user list
  const [users, setUsers] = useState<User[]>(USERS_INIT); 

  const addUser = (newUser: User) => {
    setUsers((prevUsers) => [...prevUsers, newUser]);
  };

  return (
    <div>
      <Users users = {users}/>
      {/*<Signup onAddUser={addUser}/>*/}
      <SignupX onAddUser={addUser} />
    </div>    
  );
}

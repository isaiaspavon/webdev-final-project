import Image from 'next/image';
import Card from './Card';
import styles from './User.module.css';

type UserProps = {
  user: {
    id: number;
    name: string;
    username: string;
    description: string;
    imageUrl: string;
  };
};

export default function User({ user }: UserProps) {
    return (
      <Card className={styles.bigCard}>
        <Image
          className={styles.userImg}
          src={user.imageUrl}
          alt={user.name}
          width={100}
          height={100}
          priority
        />
        <div className={styles.innerCard}>
          <div className={styles.userInfo}>
            <h2>Name: {user.name}</h2>
            <p>Username: {user.username}</p>
            <p>Description: {user.description}</p>
          </div>
          <button>
            ADD
          </button>
        </div>
      </Card>
    );
  }

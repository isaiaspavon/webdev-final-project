'use client';

import { useState } from 'react';

interface AddButtonProps {
  id: string;
  onAdd: (id: string) => void;
}

const AddButtonComponent = ({ id, onAdd }: AddButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAdd = async () => {
    setIsLoading(true);
    setError(null);
    try {
      await onAdd(id); // Call the parent's `onAdd` function to handle the API logic
    } catch (err) {
      setError('Failed to add user');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <button 
        onClick={handleAdd} 
        disabled={isLoading}>
        {isLoading ? 'Adding...' : 'Add'}
      </button>
      {error && <p>{error}</p>}
    </div>
  );
};

export default AddButtonComponent;

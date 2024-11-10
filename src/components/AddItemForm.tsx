// src/components/AddItemForm.tsx
import React, { useState } from 'react';

const AddItemForm: React.FC = () => {
  const [formData, setFormData] = useState({ item: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form Data:', formData);
    setFormData({ item: '' }); // Clear the input after submission
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        name="item"
        value={formData.item}
        onChange={handleChange}
        placeholder="Enter item"
        className="border p-2 rounded w-full"
      />
      <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
        Add Item
      </button>
    </form>
  );
};

export default AddItemForm;

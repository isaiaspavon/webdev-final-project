'use client';
import { useEffect, useState, FormEvent } from 'react';

// Update the EditItemFormProps interface to include onClose
interface EditItemFormProps {
  itemId: string; // Item ID to fetch
  onClose: () => void; // Close handler to be passed from parent component
}

const EditItemForm: React.FC<EditItemFormProps> = ({ itemId, onClose }) => {
  const [item, setItem] = useState({
    fName: '',
    lName: '',
    email: '',
    major: '',
    cleanliness: '',
    degreeLevel: '',
    gender: '',
    roommatePreference: '',
    briefDescription: '',
    hasPets: '',
    mindsPets: '',
    petType: '',
    imageURL: '',
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Fetch the item details when the component mounts or itemId changes
  useEffect(() => {
    const fetchItem = async () => {
      if (!itemId) {
        console.error('No itemId provided');
        return; // Exit early if no itemId
      }

      try {
        const response = await fetch(`/api/items/${itemId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch item');
        }

        const data = await response.json();
        const itemData = data.item;
        setItem({
          fName: itemData.fName || '',
          lName: itemData.lName || '',
          email: itemData.email || '',
          major: itemData.major || '',
          cleanliness: itemData.cleanliness || '',
          degreeLevel: itemData.degreeLevel || '',
          gender: itemData.gender || '',
          roommatePreference: itemData.roommatePreference || '',
          briefDescription: itemData.briefDescription || '',
          hasPets: itemData.hasPets || '',
          mindsPets: itemData.mindsPets || '',
          petType: itemData.petType || '',
          imageURL: itemData.imageURL || '',
        });
      } catch (error) {
        console.error('Error fetching item:', error);
      }
    };

    fetchItem();
  }, [itemId]);

  // Handle form submission
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const response = await fetch(`/api/items/${itemId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(item),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage('Item updated successfully!');
        onClose();  // Close the form after a successful update
      } else {
        setMessage(data.message || 'Failed to update item.');
      }
    } catch (error) {
      setMessage('An error occurred while updating the item.');
      console.error('Error updating item:', error);
    } finally {
      setLoading(false);
    }
  };

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setItem((prevItem) => ({
      ...prevItem,
      [name]: value,
    }));
  };

  return (
    <div>
      <h3>Edit Item</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="fName">First Name</label>
          <input
            type="text"
            id="fName"
            name="fName"
            value={item.fName}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="lName">Last Name</label>
          <input
            type="text"
            id="lName"
            name="lName"
            value={item.lName}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={item.email}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="major">Major</label>
          <input
            type="text"
            id="major"
            name="major"
            value={item.major}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="cleanliness">Cleanliness</label>
          <input
            type="text"
            id="cleanliness"
            name="cleanliness"
            value={item.cleanliness}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="degreeLevel">Degree Level</label>
          <input
            type="text"
            id="degreeLevel"
            name="degreeLevel"
            value={item.degreeLevel}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="gender">Gender</label>
          <input
            type="text"
            id="gender"
            name="gender"
            value={item.gender}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="roommatePreference">Roommate Preference</label>
          <input
            type="text"
            id="roommatePreference"
            name="roommatePreference"
            value={item.roommatePreference}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="briefDescription">Description</label>
          <textarea
            id="briefDescription"
            name="briefDescription"
            value={item.briefDescription}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="hasPets">Has Pets</label>
          <input
            type="text"
            id="hasPets"
            name="hasPets"
            value={item.hasPets}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="mindsPets">Minds Pets</label>
          <input
            type="text"
            id="mindsPets"
            name="mindsPets"
            value={item.mindsPets}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="petType">Pet Type</label>
          <input
            type="text"
            id="petType"
            name="petType"
            value={item.petType}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="imageURL">Image URL</label>
          <input
            type="url"
            id="imageURL"
            name="imageURL"
            value={item.imageURL}
            onChange={handleInputChange}
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Updating...' : 'Update Item'}
        </button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
};

export default EditItemForm;

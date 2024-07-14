import React, { useState, useEffect } from 'react';
import { db, storage } from '../config/Config';
import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const AddFlower = () => {
  const [flowerName, setFlowerName] = useState('');
  const [flowerPrice, setFlowerPrice] = useState('');
  const [flowerImage, setFlowerImage] = useState(null);
  const [error, setError] = useState('');
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
        alert('Please log in to add flowers');
      }
    });

    return () => unsubscribe();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setFlowerImage(file);
      setError('');
    } else {
      setFlowerImage(null);
      setError('Please upload a valid image file');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;

    if (!user) {
      alert('You must be logged in to add a flower');
      return;
    }

    if (!flowerName || !flowerPrice || !flowerImage) {
      alert('Please fill in all fields');
      return;
    }

    setLoading(true);

    try {
      // Upload image to Firebase Storage
      const storageRef = ref(storage, `flowers/${flowerImage.name}`);
      await uploadBytes(storageRef, flowerImage);
      const imageUrl = await getDownloadURL(storageRef);
      console.log('Image uploaded to Firebase Storage:', imageUrl);

      // Add flower data to Firestore
      const docRef = await addDoc(collection(db, 'flowers'), {
        name: flowerName,
        price: flowerPrice,
        image: imageUrl,
      });
      console.log('Flower added to Firestore with ID:', docRef.id);

      // Reset form fields and state
      alert('Flower added successfully');
      setFlowerName('');
      setFlowerPrice('');
      setFlowerImage(null);
    } catch (error) {
      console.error('Error adding flower: ', error);
      setError('Error adding flower: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container p-4">
      <h2 className="text-2xl font-bold mb-4 text-left">ADD FLOWER</h2>
      <hr className="mb-4" />
      <form autoComplete="off" className="space-y-4" onSubmit={handleSubmit}>
        {/* Flower Name */}
        <div className="form-group">
          <label htmlFor="flower-name" className="block text-sm font-medium text-gray-700 text-left">
            Flower Name
          </label>
          <input
            type="text"
            id="flower-name"
            className="form-control mt-1 block w-full max-w-xs px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            value={flowerName}
            onChange={(e) => setFlowerName(e.target.value)}
            required
          />
        </div>

        {/* Flower Price */}
        <div className="form-group">
          <label htmlFor="flower-price" className="block text-sm font-medium text-gray-700 text-left">
            Flower Price
          </label>
          <input
            type="text"
            id="flower-price"
            className="form-control mt-1 block w-full max-w-xs px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            value={flowerPrice}
            onChange={(e) => setFlowerPrice(e.target.value)}
            required
          />
        </div>

        {/* Flower Image */}
        <div className="form-group">
          <label htmlFor="flower-img" className="block text-sm font-medium text-gray-700 text-left">
            Flower Image
          </label>
          <input
            type="file"
            id="flower-img"
            className="form-control mt-1 block w-full max-w-xs px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            onChange={handleImageChange}
            required
          />
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </div>

        {/* Submit Button */}
        <div className="text-left">
          <button
            type="submit"
            className={`btn btn-success btn-md mybtn bg-green-500 text-white px-4 py-2 rounded-md shadow-sm ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-green-600'}`}
            disabled={loading}
          >
            {loading ? 'Adding...' : 'ADD'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddFlower;
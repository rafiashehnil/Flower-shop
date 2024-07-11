import React, { useState } from 'react';
import { db, storage } from '../config/Config';
import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const AddProducts = () => {
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productImage, setProductImage] = useState(null);
  const [error, setError] = useState('');
  const [user, setUser] = useState(null);

  // Monitor authentication state
  React.useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
        alert('Please log in to add products');
      }
    });
  }, []);

  // Handle image file change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setProductImage(file);
      setError('');
    } else {
      setProductImage(null);
      setError('Please upload a valid image file');
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      alert('You must be logged in to add a product');
      return;
    }

    if (!productName || !productPrice || !productImage) {
      alert('Please fill in all fields');
      return;
    }

    try {
      // Upload image to Firebase Storage
      const storageRef = ref(storage, `products/${productImage.name}`);
      await uploadBytes(storageRef, productImage);
      const imageUrl = await getDownloadURL(storageRef);
      console.log('Image uploaded to Firebase Storage:', imageUrl);

      // Add product data to Firestore
      const docRef = await addDoc(collection(db, 'products'), {
        name: productName,
        price: productPrice,
        imageUrl: imageUrl,
      });
      console.log('Product added to Firestore with ID:', docRef.id);

      // Reset form fields and state
      alert('Product added successfully');
      setProductName('');
      setProductPrice('');
      setProductImage(null);
    } catch (error) {
      console.error('Error adding product: ', error);
      setError('Error adding product: ' + error.message);
    }
  };

  return (
    <div className="container p-4">
      <h2 className="text-2xl font-bold mb-4 text-left">ADD PRODUCTS</h2>
      <hr className="mb-4" />
      <form autoComplete="off" className="space-y-4" onSubmit={handleSubmit}>
        {/* Product Name */}
        <div className="form-group">
          <label htmlFor="product-name" className="block text-sm font-medium text-gray-700 text-left">
            Product Name
          </label>
          <input
            type="text"
            id="product-name"
            className="form-control mt-1 block w-full max-w-xs px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            required
          />
        </div>

        {/* Product Price */}
        <div className="form-group">
          <label htmlFor="product-price" className="block text-sm font-medium text-gray-700 text-left">
            Product Price
          </label>
          <input
            type="text"
            id="product-price"
            className="form-control mt-1 block w-full max-w-xs px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
            required
          />
        </div>

        {/* Product Image */}
        <div className="form-group">
          <label htmlFor="product-img" className="block text-sm font-medium text-gray-700 text-left">
            Product Image
          </label>
          <input
            type="file"
            id="product-img"
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
            className="btn btn-success btn-md mybtn bg-green-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            ADD
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProducts;

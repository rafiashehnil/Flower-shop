import React, { useState, useEffect } from 'react';
import { db, auth } from '../config/Config';
import { collection, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore';

const AdminDashboard = () => {
  const [flowers, setFlowers] = useState([]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    const fetchFlowers = async () => {
      try {
        const flowersCollection = collection(db, 'flowers');
        const flowersSnapshot = await getDocs(flowersCollection);
        const flowersList = flowersSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setFlowers(flowersList);
      } catch (error) {
        console.error('Error fetching flowers: ', error);
      }
    };

    fetchFlowers();
  }, []);

  const addFlower = async () => {
    try {
      await addDoc(collection(db, 'flowers'), {
        name,
        price: parseFloat(price),
        image,
        description,
      });
      setName('');
      setPrice('');
      setImage('');
      setDescription('');
      fetchFlowers();
    } catch (error) {
      console.error('Error adding flower: ', error);
    }
  };

  const deleteFlower = async (id) => {
    try {
      await deleteDoc(doc(db, 'flowers', id));
      fetchFlowers();
    } catch (error) {
      console.error('Error deleting flower: ', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 m-2"
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="border p-2 m-2"
        />
        <input
          type="text"
          placeholder="Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          className="border p-2 m-2"
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border p-2 m-2"
        />
        <button
          onClick={addFlower}
          className="btn bg-green-500 text-white hover:bg-green-600 p-2"
        >
          Add Flower
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {flowers.map((flower, index) => (
          <div key={index} className="card shadow-lg">
            <figure>
              <img src={flower.image} alt={flower.name} className="w-full h-48 object-cover" />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{flower.name}</h2>
              <p>{flower.price}</p>
              <p>{flower.description}</p>
              <button
                onClick={() => deleteFlower(flower.id)}
                className="btn bg-red-500 text-white hover:bg-red-600"
              >
                Delete Flower
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;


import React, { useState, useEffect } from 'react';
import { db, auth } from '../config/Config';
import { collection, getDocs, addDoc } from 'firebase/firestore';

const Shop = () => {
  const [flowers, setFlowers] = useState([]);

  useEffect(() => {
    const fetchFlowers = async () => {
      try {
        const flowersCollection = collection(db, 'flowers');
        const flowersSnapshot = await getDocs(flowersCollection);
        const flowersList = flowersSnapshot.docs.map(doc => ({
          id: doc.id, ...doc.data()
        }));
        console.log("Fetched flowers:", flowersList);
        setFlowers(flowersList);
      } catch (error) {
        console.error("Error fetching flowers: ", error);
      }
    };

    fetchFlowers();
  }, []);

  const addToCart = async (flower) => {
    const user = auth.currentUser;
    if (!user) {
      alert('You must be logged in to add items to your cart.');
      return;
    }

    try {
      const cartRef = collection(db, 'carts', user.uid, 'items');
      await addDoc(cartRef, {
        name: flower.name,
        price: flower.price,
        image: flower.image,
        quantity: 1,
      });
      alert(`${flower.name} has been added to your cart!`);
    } catch (error) {
      console.error("Error adding to cart: ", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Flower Catalog</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {flowers.length > 0 ? (
          flowers.map((flower, index) => (
            <div key={index} className="card shadow-lg">
              <figure>
                <img src={flower.image} alt={flower.name} className="w-full h-48 object-cover" />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{flower.name}</h2>
                <p>{flower.price}</p>
                <button
                  onClick={() => addToCart(flower)}
                  className="btn bg-green-500 text-white hover:bg-green-600"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No flowers available at the moment.</p>
        )}
      </div>
    </div>
  );
};

export default Shop;
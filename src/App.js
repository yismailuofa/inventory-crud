import { useState, useEffect } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "./firebase";

export default function App() {
  const [products, setProducts] = useState([]);

  const ref = collection(db, "products");

  const getProducts = () => {
    onSnapshot(ref, (querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push(doc.data());
      });
      setProducts(items);
    });
  };

  useEffect(() => {
    getProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-row flex-wrap gap-4 justify-center">
      {products.map((product) => (
        <div
          key={product.name}
          className="max-w-sm rounded-lg overflow-hidden shadow-lg border-4 border-gray-900 basis-1/4 aspect-square my-4 flex flex-col"
        >
          <div className="px-6 py-4 text-3xl font-bold mb-2 grow">
            {product.name}
          </div>
          <div className="px-6 py-4 text-3xl text-gray-700">
            Cost: ${product.price}
          </div>
          <div className="px-6 py-4 text-3xl text-gray-700">
            Quantity: {product.quantity}
          </div>
        </div>
      ))}
    </div>
  );
}

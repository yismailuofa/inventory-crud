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
    <div>
      {products.map((product) => (
        <div key={product.name} className="border-4 rounded-md">
          <div className="text-3xl font-bold">{product.name}</div>
          <div className="text-xl font-light">${product.price}</div>
          <div className="text-xl font-light">{product.quantity}</div>
        </div>
      ))}
    </div>
  );
}

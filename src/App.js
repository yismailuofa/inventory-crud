import { useState, useEffect } from "react";
import {
  collection,
  getDocs,
  onSnapshot,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { db } from "./firebase";
import AddButton from "./AddButton";

export default function App() {
  const [products, setProducts] = useState([]);
  const [showProducts, setShowProducts] = useState(true);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [currIndex, setCurrIndex] = useState(0);

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

  const handleNameChange = (e) => {
    setCurrentProduct((prev) => {
      const copy = Object.assign({}, prev);
      copy.name = e.target.value;
      return copy;
    });
  };

  const handlePriceChange = (e) => {
    setCurrentProduct((prev) => {
      const copy = Object.assign({}, prev);
      copy.price = isNaN(parseInt(e.target.value))
        ? 0
        : parseInt(e.target.value);
      return copy;
    });
  };

  const handleQuanChange = (e) => {
    setCurrentProduct((prev) => {
      const copy = Object.assign({}, prev);
      copy.quantity = isNaN(parseInt(e.target.value))
        ? 0
        : parseInt(e.target.value);
      return copy;
    });
  };

  const handleSave = async () => {
    if (
      currentProduct.name === "" ||
      isNaN(currentProduct.price) ||
      isNaN(currentProduct.quantity)
    ) {
      alert("Error in field, could not save.");
    } else {
      const q = query(ref, where("name", "==", products[currIndex].name));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setDoc(doc.ref, {
          name: currentProduct.name,
          price: currentProduct.price,
          quantity: currentProduct.quantity,
        });
      });
      alert("Product saved.");
    }
  };

  if (!showProducts) {
    return (
      <div className="px-6 py-4">
        <div className="px-6 py-2 text-xl text-gray-700">
          Name:{" "}
          <input
            value={currentProduct.name}
            className="border-2"
            onChange={handleNameChange}
          ></input>
        </div>
        <div className="px-6 py-2 text-xl text-gray-700">
          Price:{" "}
          <input
            value={currentProduct.price}
            className="border-2"
            onChange={handlePriceChange}
          ></input>
        </div>
        <div className="px-6 py-2 text-xl text-gray-700">
          Quantity:{" "}
          <input
            value={currentProduct.quantity}
            className="border-2"
            onChange={handleQuanChange}
          ></input>
        </div>
        <button
          className="rounded-md bg-sky-300 p-2 mx-2 font-semibold"
          onClick={() => setShowProducts(true)}
        >
          Go Back
        </button>
        <button
          className="rounded-md bg-green-300 p-2 mx-2 font-semibold"
          onClick={() => handleSave()}
        >
          Save
        </button>
        <button className="rounded-md bg-rose-300 p-2 mx-2 font-semibold">
          Delete
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-row flex-wrap gap-4 justify-center">
      {products.map((product) => (
        <div
          key={product.name}
          className="max-w-md min-w-max rounded-lg overflow-hidden shadow-lg border-4 border-gray-900 basis-1/4 aspect-square my-4 flex flex-col cursor-pointer"
          onClick={() => {
            setCurrentProduct(
              products.find((item) => item.name === product.name)
            );
            setCurrIndex(
              products.findIndex((item) => item.name === product.name)
            );
            setShowProducts(false);
          }}
        >
          <div className="px-6 py-4 text-3xl font-bold mb-2 grow">
            {product.name}
          </div>
          <div className="px-6 py-2 text-xl text-gray-700">
            Price: ${product.price}
          </div>
          <div className="px-6 py-2 text-xl text-gray-700">
            Quantity: {product.quantity}
          </div>
        </div>
      ))}
      <AddButton />
    </div>
  );
}

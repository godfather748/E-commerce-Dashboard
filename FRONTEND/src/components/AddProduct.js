import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const [productName, setProductName] = useState("");
  const [company, setCompany] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState();
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  const addProduct = async () => {
    if (!productName || !company || !category || !price) {
      setError(true);
      return;
    }

    const auth = localStorage.getItem("user");

    let result = await fetch("http://localhost:5000/add-product", {
      method: "post",
      body: JSON.stringify({
        name: productName,
        company,
        category,
        price,
        userId: JSON.parse(auth)._id,
      }),
      headers: {
        "Content-Type": "application/json",
        authorization: JSON.parse(localStorage.getItem("token")),
      },
    });

    navigate(`/${JSON.parse(auth)._id}`);
  };

  return (
    <div style={{ marginLeft: "30%" }}>
      <h1>Add Product</h1>
      <input
        value={productName}
        onChange={(e) => setProductName(e.target.value)}
        class="inputBox"
        type="text"
        placeholder="Enter Name"
      />
      {error && !productName && (
        <span class="invalid-input">Enter valid name</span>
      )}
      <input
        value={company}
        onChange={(e) => setCompany(e.target.value)}
        class="inputBox"
        type="text"
        placeholder="Enter Company"
      />
      {error && !company && (
        <span class="invalid-input">Enter valid company</span>
      )}
      <input
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        class="inputBox"
        type="text"
        placeholder="Enter Category"
      />
      {error && !category && (
        <span class="invalid-input">Enter valid category</span>
      )}
      <input
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        class="inputBox"
        type="number"
        placeholder="Enter Price"
      />
      {error && !price && <span class="invalid-input">Enter valid price</span>}
      <button onClick={addProduct} type="button" class="appButton">
        Add product
      </button>
    </div>
  );
};

export default AddProduct;

import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const UpdateProduct = () => {
  const [productName, setProductName] = useState("");
  const [company, setCompany] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState();
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  const params = useParams();

  const auth = localStorage.getItem("user");

  useEffect(() => {
    if (!params.id) {
      navigate(`/${JSON.parse(auth)._id}`);
      return;
    }
    getProduct();
  }, []);

  const getProduct = async () => {
    let result = await fetch(
      `http://localhost:5000/update-product/${params.id}`,
      {
        method: "get",
        headers: {
          authorization: JSON.parse(localStorage.getItem("token")),
        },
      }
    );
    result = await result.json();
    setProductName(result.name);
    setCompany(result.company);
    setCategory(result.category);
    setPrice(result.price);
  };

  const updateProduct = async () => {
    if (!productName || !company || !category || !price) {
      setError(true);
      return;
    }

    let result = await fetch(
      `http://localhost:5000/update-product/${params.id}`,
      {
        method: "put",
        body: JSON.stringify({
          name: productName,
          company: company,
          category: category,
          price: price,
        }),
        headers: {
          "Content-Type": "application/json",
          authorization: JSON.parse(localStorage.getItem("token")),
        },
      }
    );

    navigate(`/${JSON.parse(auth)._id}`);
  };

  return (
    <div style={{ marginLeft: "30%" }}>
      <h1>Update Product</h1>
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
      <button onClick={updateProduct} type="button" class="appButton">
        Update product
      </button>
    </div>
  );
};

export default UpdateProduct;

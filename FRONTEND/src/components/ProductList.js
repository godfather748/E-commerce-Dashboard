import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  const auth = localStorage.getItem("user");

  const getProducts = async () => {
    let result = await fetch(`http://localhost:5000/${JSON.parse(auth)._id}`, {
      method: "get",
      headers: {
        authorization: JSON.parse(localStorage.getItem("token")),
      },
    });
    result = await result.json();
    setProducts(result);
  };

  const deleteProduct = async (id) => {
    let result = await fetch(`http://localhost:5000/${id}`, {
      method: "delete",
      headers: {
        authorization: JSON.parse(localStorage.getItem("token")),
      },
    });
    getProducts();
  };

  const search = async (key) => {
    if (key === "") {
      getProducts();
      return;
    }
    let result = await fetch(`http://localhost:5000/search/${key}`, {
      method: "get",
      headers: {
        authorization: JSON.parse(localStorage.getItem("token")),
      },
    });

    result = await result.json();
    setProducts(result);
  };

  return (
    <div class="product-list">
      <h1>Product List</h1>
      <input
        class="search-product-box"
        onChange={(e) => {
          search(e.target.value);
        }}
        type="text"
        placeholder="search"
      ></input>
      <ul>
        <li>S.No.</li>
        <li>Name</li>
        <li>Company</li>
        <li>Category</li>
        <li>Price</li>
        <li>Delete</li>
        <li>Update</li>
      </ul>
      {products.length > 0 ? (
        products.map((product, index) => {
          return (
            <ul key={index}>
              <li>{index + 1}</li>
              <li>{product.name}</li>
              <li>{product.company}</li>
              <li>{product.category}</li>
              <li>{product.price}</li>
              <li>
                <button
                  onClick={() => {
                    deleteProduct(product._id);
                  }}
                  type="button"
                >
                  Delete
                </button>
              </li>
              <li>
                <Link to={"/update-product/" + product._id}>Update</Link>
              </li>
            </ul>
          );
        })
      ) : (
        <h2>No product found</h2>
      )}
    </div>
  );
};

export default ProductList;

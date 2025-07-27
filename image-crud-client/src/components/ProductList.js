import React, { useEffect, useState } from 'react';
import { fetchProducts, deleteProduct } from '../services/api';
import './ProductList.css'; // (optional if using separate CSS)

function ProductList({ onEdit, refresh }) {
  const [products, setProducts] = useState([]);

  const loadProducts = async () => {
    try {
      const res = await fetchProducts();
      setProducts(res.data);
    } catch (error) {
      console.error("Failed to load products", error);
    }
  };

  useEffect(() => {
    loadProducts();
  }, [refresh]);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure to delete?")) {
      await deleteProduct(id);
      loadProducts();
    }
  };

  return (
    <div className="product-table-container">
      <h2>🛍️ Products List</h2>
      <table className="product-table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Price (₹)</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.length === 0 && (
            <tr>
              <td colSpan="4" style={{ textAlign: 'center' }}>No products found</td>
            </tr>
          )}
          {products.map(product => (
            <tr key={product.id}>
              <td>
                {product.imageUrl && (
                  <img
                    src={`https://localhost:7225/${product.imageUrl}`}
                    alt={product.name}
                    width="80"
                    height="80"
                    style={{ objectFit: 'cover', borderRadius: '6px' }}
                  />
                )}
              </td>
              <td>{product.name}</td>
              <td>₹{product.price.toFixed(2)}</td>
              <td>
                <button className="btn edit" onClick={() => onEdit(product)}>✏️ Edit</button>
                <button className="btn delete" onClick={() => handleDelete(product.id)}>🗑️ Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductList;

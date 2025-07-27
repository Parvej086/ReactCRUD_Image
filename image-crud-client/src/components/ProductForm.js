import React, { useState, useEffect } from 'react';
import { uploadProduct, updateProduct } from '../services/api';

function ProductForm({ onSaved, currentProduct }) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (currentProduct) {
      setName(currentProduct.name);
      setPrice(currentProduct.price);
    }
  }, [currentProduct]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { name, price };

    if (currentProduct) {
      await updateProduct(currentProduct.id, data, image);
    } else {
      await uploadProduct(data, image);
    }

    setName('');
    setPrice('');
    setImage(null);
    onSaved(); // Refresh list
  };

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data">
      <h2>{currentProduct ? 'Edit' : 'Add'} Product</h2>

      <input
        type="text"
        placeholder="Product Name"
        value={name}
        required
        onChange={(e) => setName(e.target.value)}
      />
      <br />

      <input
        type="number"
        placeholder="Price"
        value={price}
        required
        onChange={(e) => setPrice(e.target.value)}
      />
      <br />

      <input
        type="file"
        onChange={(e) => setImage(e.target.files[0])}
        accept="image/*"
      />
      <br />

      <button type="submit">{currentProduct ? 'Update' : 'Create'}</button>
    </form>
  );
}

export default ProductForm;

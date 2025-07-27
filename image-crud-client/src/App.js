import React, { useState } from 'react';
import ProductForm from './components/ProductForm';
import ProductList from './components/ProductList';

function App() {
  const [editingProduct, setEditingProduct] = useState(null);
  const [refreshFlag, setRefreshFlag] = useState(false);

  const handleSaved = () => {
    setEditingProduct(null);
    setRefreshFlag(!refreshFlag); // force reload
  };

  return (
    <div style={{ padding: '30px' }}>
      <ProductForm onSaved={handleSaved} currentProduct={editingProduct} />
      <hr />
      <ProductList onEdit={setEditingProduct} refresh={refreshFlag} />
    </div>
  );
}

export default App;

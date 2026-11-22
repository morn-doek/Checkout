import React, { useState } from 'react';
import { ShoppingCart, Check, Star, ArrowRight, Laptop, Mouse, Keyboard, Monitor, Tag } from 'lucide-react';

export default function ProductList({
  products,
  categories,
  selectedCategory,
  onSelectCategory,
  cart,
  onAddToCart,
  onGoToCart
}) {
  const [addedAnimationId, setAddedAnimationId] = useState(null);

  const getProductCartQty = (productId) => {
    const item = cart.find((i) => i.id === productId);
    return item ? item.quantity : 0;
  };

  const handleAdd = (product) => {
    onAddToCart(product);
    setAddedAnimationId(product.id);
    setTimeout(() => {
      setAddedAnimationId(null);
    }, 1200);
  };

  const getIcon = (type) => {
    switch (type) {
      case 'laptop':
        return <Laptop size={32} />;
      case 'mouse':
        return <Mouse size={32} />;
      case 'keyboard':
        return <Keyboard size={32} />;
      case 'monitor':
        return <Monitor size={32} />;
      default:
        return <Laptop size={32} />;
    }
  };

  // Filter products by selected category
  const filteredProducts =
    selectedCategory === 'All'
      ? products
      : products.filter(
          (p) =>
            p.category?.toLowerCase() === selectedCategory.toLowerCase() ||
            p.categoryFullName?.toLowerCase().includes(selectedCategory.toLowerCase())
        );

  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  // Helper to count items per category
  const getCategoryCount = (catName) => {
    if (catName === 'All') return products.length;
    return products.filter(
      (p) =>
        p.category?.toLowerCase() === catName.toLowerCase() ||
        p.categoryFullName?.toLowerCase().includes(catName.toLowerCase())
    ).length;
  };

  return (
    <div className="products-page">
      {/* Clean Modern Store Header */}
      <div className="section-header">
        <h1 className="main-heading">Featured Tech Products</h1>
        <p className="sub-heading">
          Explore our premium selection of tech devices and computer accessories.
        </p>
      </div>

      {/* Category Filter Pills Toolbar */}
      <div className="category-filter-toolbar">
        <div className="category-pills-row">
          <button
            type="button"
            className={`cat-pill-btn ${selectedCategory === 'All' ? 'active-pill' : ''}`}
            onClick={() => onSelectCategory('All')}
          >
            <span>All Products</span>
            <span className="pill-count-badge">{getCategoryCount('All')}</span>
          </button>

          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              className={`cat-pill-btn ${selectedCategory === cat.name ? 'active-pill' : ''}`}
              onClick={() => onSelectCategory(cat.name)}
            >
              <span>{cat.name}</span>
              <span className="pill-count-badge">{getCategoryCount(cat.name)}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Products Cards Grid */}
      {filteredProducts.length === 0 ? (
        <div className="empty-category-notice">
          <Tag size={40} className="empty-cat-icon" />
          <h3>No products in "{selectedCategory}" yet</h3>
          <p>You can browse other categories or view all products.</p>
          <button className="btn-primary" onClick={() => onSelectCategory('All')}>
            View All Products
          </button>
        </div>
      ) : (
        <div className="products-grid">
          {filteredProducts.map((product) => {
            const inCartCount = getProductCartQty(product.id);
            const isJustAdded = addedAnimationId === product.id;

            return (
              <div key={product.id} className="product-card">
                {/* Product Badge */}
                <div className="product-card-badge">{product.badge}</div>

                {/* Product Image */}
                <div className="product-image-container">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="product-img"
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      e.currentTarget.nextSibling.style.display = 'flex';
                    }}
                  />
                  <div className="product-fallback-icon" style={{ display: 'none' }}>
                    {getIcon(product.fallbackIcon)}
                    <span>{product.name}</span>
                  </div>
                </div>

                {/* Product Info */}
                <div className="product-details">
                  <div className="product-category">{product.category}</div>
                  <h3 className="product-title">{product.name}</h3>
                  <p className="product-desc">{product.description}</p>

                  {/* Rating */}
                  <div className="product-rating">
                    <Star size={16} className="star-filled" fill="#f59e0b" stroke="#f59e0b" />
                    <span className="rating-score">{product.rating}</span>
                    <span className="rating-count">({product.reviews} reviews)</span>
                  </div>

                  {/* Price & Action */}
                  <div className="product-footer">
                    <div className="price-tag">
                      <span className="currency">$</span>
                      <span className="amount">{product.price.toFixed(2)}</span>
                    </div>

                    {/* Add to Cart Button */}
                    <button
                      className={`btn-add-to-cart ${isJustAdded ? 'added' : ''}`}
                      onClick={() => handleAdd(product)}
                    >
                      {isJustAdded ? (
                        <>
                          <Check size={18} />
                          <span>Added!</span>
                        </>
                      ) : (
                        <>
                          <ShoppingCart size={18} />
                          <span>Add to Cart</span>
                          {inCartCount > 0 && (
                            <span className="in-cart-indicator">({inCartCount})</span>
                          )}
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Floating Cart Bottom Bar */}
      {totalCartCount > 0 && (
        <div className="floating-cart-banner">
          <div className="banner-content">
            <div className="banner-info">
              <span className="banner-pill">{totalCartCount} item{totalCartCount > 1 ? 's' : ''} in cart</span>
              <span className="banner-text">Ready to review your order?</span>
            </div>
            <button className="banner-action-btn" onClick={onGoToCart}>
              <span>View Shopping Cart</span>
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

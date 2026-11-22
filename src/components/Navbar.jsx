import React from 'react';
import { ShoppingBag, Search, Heart, User, Cpu } from 'lucide-react';

export default function Navbar({
  currentView,
  setCurrentView,
  cartCount,
  cartTotal,
  setSelectedCategory
}) {
  return (
    <header className="site-header">
      {/* Top Utility Announcement Bar */}
      <div className="top-bar">
        <div className="container top-bar-content">
          <div className="top-bar-left">
            <span>🚚 Free Express Delivery on orders over $500</span>
          </div>
          <div className="top-bar-right">
            <span>USD ($)</span>
            <span className="dot-divider">•</span>
            <span>English</span>
            <span className="dot-divider">•</span>
            <span>24/7 Dedicated Support</span>
          </div>
        </div>
      </div>

      {/* Main Luxury Header */}
      <div className="main-nav-wrapper">
        <div className="container main-nav">
          {/* Brand Logo */}
          <div
            className="brand-group"
            onClick={() => {
              if (setSelectedCategory) setSelectedCategory('All');
              setCurrentView('products');
            }}
            role="button"
            tabIndex={0}
          >
            <div className="brand-emblem">
              <Cpu size={20} strokeWidth={2.2} />
            </div>
            <span className="brand-logo-text">TechStore</span>
          </div>

          {/* Centered Professional Search Bar */}
          <div className="nav-center-search">
            <div className="search-box-pill">
              <Search size={17} className="search-box-icon" />
              <input
                type="text"
                placeholder="Search laptops, accessories, gear..."
                className="search-box-field"
              />
              <span className="search-key-badge">⌘K</span>
            </div>
          </div>

          {/* Right Header Actions */}
          <div className="header-actions">
            {/* Products Page Link */}
            <button
              className={`header-text-link ${currentView === 'products' ? 'link-active' : ''}`}
              onClick={() => {
                if (setSelectedCategory) setSelectedCategory('All');
                setCurrentView('products');
              }}
            >
              Shop
            </button>

            {/* Wishlist */}
            <button className="action-circle-btn" title="Wishlist" aria-label="Wishlist">
              <Heart size={19} />
            </button>

            {/* Account */}
            <button className="action-circle-btn" title="Account Profile" aria-label="Account">
              <User size={19} />
            </button>

            {/* Modern Cart Pill Button */}
            <button
              className="cart-pill-premium"
              onClick={() => setCurrentView('cart')}
              aria-label="View Shopping Cart"
            >
              <div className="cart-pill-bag-icon">
                <ShoppingBag size={18} strokeWidth={2} />
                {cartCount > 0 && <span className="cart-badge-dot">{cartCount}</span>}
              </div>
              <span className="cart-pill-price-text">${cartTotal.toFixed(2)}</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

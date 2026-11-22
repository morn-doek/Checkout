import React, { useState } from 'react';
import { Trash2, Heart, Plus, Minus, ArrowLeft, ShoppingBag, ShieldCheck, Tag, Lock, Truck, RefreshCw } from 'lucide-react';

export default function CartView({
  cart,
  onUpdateQty,
  onRemoveItem,
  onClearCart,
  onProceedToCheckout,
  onContinueShopping,
  subtotal,
  discount,
  shippingFee,
  grandTotal,
  appliedPromo,
  onApplyPromo
}) {
  const [promoInput, setPromoInput] = useState('');
  const [promoMessage, setPromoMessage] = useState(null);
  const [showPromoInput, setShowPromoInput] = useState(false);
  const [savedForLater, setSavedForLater] = useState([]);

  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (!promoInput.trim()) {
      setPromoMessage({ type: 'error', text: 'Please enter a valid promo code.' });
      return;
    }
    const result = onApplyPromo(promoInput);
    if (result.success) {
      setPromoMessage({ type: 'success', text: result.message });
      setPromoInput('');
    } else {
      setPromoMessage({ type: 'error', text: result.message });
    }
  };

  const handleSaveForLater = (id) => {
    if (savedForLater.includes(id)) {
      setSavedForLater(savedForLater.filter(itemId => itemId !== id));
    } else {
      setSavedForLater([...savedForLater, id]);
    }
  };

  const freeShippingThreshold = 200;
  const progressToFreeShipping = Math.min(100, (subtotal / freeShippingThreshold) * 100);
  const amountNeededForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  if (cart.length === 0) {
    return (
      <div className="empty-cart-view">
        <div className="empty-cart-card">
          <div className="empty-cart-illustration">
            <ShoppingBag size={48} strokeWidth={1.5} />
          </div>
          <h2 className="empty-cart-title">Your Cart is Empty</h2>
          <p className="empty-cart-subtitle">
            Looks like you haven't added anything to your cart yet. Explore our featured tech products and find your next favorite device.
          </p>
          <button className="btn-solid-dark" onClick={onContinueShopping}>
            <ArrowLeft size={16} />
            <span>Start Shopping</span>
          </button>
        </div>
      </div>
    );
  }

  const totalItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="cart-page-container">
      {/* Top Shipping Bar / Threshold Alert */}
      <div className="shipping-progress-banner">
        <div className="shipping-progress-info">
          <Truck size={18} className="truck-icon" />
          {amountNeededForFreeShipping === 0 ? (
            <span><strong>Congratulations!</strong> You have unlocked <strong>Free Standard Shipping</strong></span>
          ) : (
            <span>Add <strong>${amountNeededForFreeShipping.toFixed(2)}</strong> more to qualify for <strong>Free Shipping</strong></span>
          )}
        </div>
        <div className="progress-track">
          <div 
            className="progress-fill" 
            style={{ width: `${progressToFreeShipping}%` }} 
          />
        </div>
      </div>

      <div className="cart-main-grid">
        {/* Left Column: Cart Items List */}
        <div className="cart-items-section">
          {/* Header */}
          <div className="cart-title-row">
            <h1 className="cart-header-title">
              Cart <span className="cart-count-sub">({totalItemsCount} item{totalItemsCount > 1 ? 's' : ''})</span>
            </h1>
            <button className="clear-cart-link" onClick={onClearCart}>
              Remove all
            </button>
          </div>

          {/* Items */}
          <div className="cart-list">
            {cart.map((item) => {
              const itemTotal = item.price * item.quantity;
              const isSaved = savedForLater.includes(item.id);

              return (
                <div key={item.id} className="cart-row-item">
                  {/* Image */}
                  <div className="cart-item-image-box">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="cart-thumb"
                      onError={(e) => {
                        e.currentTarget.src = "https://images.unsplash.com/photo-1526738549149-8e07eca6c147?auto=format&fit=crop&w=300&q=80";
                      }}
                    />
                  </div>

                  {/* Info */}
                  <div className="cart-item-body">
                    <div className="cart-item-meta">
                      <div className="cart-item-title-grp">
                        <h3 className="cart-product-title">{item.name}</h3>
                        <p className="cart-product-category">{item.category}</p>
                        <div className="cart-product-specs">
                          <span className="spec-item">Standard Edition</span>
                          <span className="spec-dot">•</span>
                          <span className="spec-item in-stock-text">In Stock</span>
                        </div>
                      </div>

                      {/* Price on Desktop */}
                      <div className="cart-price-column">
                        <span className="cart-line-price">${itemTotal.toFixed(2)}</span>
                        {item.quantity > 1 && (
                          <span className="cart-unit-rate">(${item.price.toFixed(2)} each)</span>
                        )}
                      </div>
                    </div>

                    {/* Bottom Row: Actions & Stepper */}
                    <div className="cart-item-footer">
                      {/* Favorite & Remove Buttons */}
                      <div className="cart-item-actions">
                        <button 
                          className={`icon-action-btn ${isSaved ? 'favorited' : ''}`}
                          onClick={() => handleSaveForLater(item.id)}
                          title={isSaved ? "Saved" : "Save for later"}
                          aria-label="Save for later"
                        >
                          <Heart size={18} fill={isSaved ? "#ef4444" : "none"} color={isSaved ? "#ef4444" : "currentColor"} />
                        </button>

                        <button 
                          className="icon-action-btn remove-action-btn"
                          onClick={() => onRemoveItem(item.id)}
                          title="Remove item"
                          aria-label="Remove item"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>

                      {/* Modern Quantity Pill */}
                      <div className="quantity-pill-stepper">
                        <button
                          type="button"
                          className="stepper-btn"
                          onClick={() => onUpdateQty(item.id, item.quantity - 1)}
                          aria-label="Decrease quantity"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="stepper-number">{item.quantity}</span>
                        <button
                          type="button"
                          className="stepper-btn"
                          onClick={() => onUpdateQty(item.id, item.quantity + 1)}
                          aria-label="Increase quantity"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Continue Shopping Link */}
          <div className="cart-return-row">
            <button className="continue-shopping-btn" onClick={onContinueShopping}>
              <ArrowLeft size={16} />
              <span>Continue Shopping</span>
            </button>
          </div>
        </div>

        {/* Right Column: Order Summary (Webyansh Style) */}
        <div className="cart-summary-section">
          <div className="summary-sticky-card">
            <h2 className="summary-heading">Order Summary</h2>

            <div className="summary-calc-rows">
              <div className="calc-row">
                <span className="calc-label">Subtotal</span>
                <span className="calc-value">${subtotal.toFixed(2)}</span>
              </div>

              <div className="calc-row">
                <span className="calc-label">Delivery</span>
                <span className="calc-value">
                  {shippingFee === 0 ? (
                    <span className="highlight-free">Free</span>
                  ) : (
                    `$${shippingFee.toFixed(2)}`
                  )}
                </span>
              </div>

              {discount > 0 && (
                <div className="calc-row discount-applied-row">
                  <span className="calc-label">
                    Discount <span className="discount-tag-code">{appliedPromo}</span>
                  </span>
                  <span className="calc-value discount-amount">-${discount.toFixed(2)}</span>
                </div>
              )}

              <div className="calc-divider" />

              <div className="calc-row total-calc-row">
                <span className="total-title">Total</span>
                <span className="total-amount-display">${grandTotal.toFixed(2)}</span>
              </div>
            </div>

            {/* Primary Checkout Button */}
            <button 
              className="btn-checkout-solid"
              onClick={onProceedToCheckout}
            >
              <Lock size={16} />
              <span>Checkout</span>
            </button>

            {/* Promo Code Accordion */}
            <div className="promo-accordion">
              {!showPromoInput && !appliedPromo ? (
                <button 
                  className="promo-toggle-link"
                  onClick={() => setShowPromoInput(true)}
                >
                  <Tag size={15} />
                  <span>Use a promo code</span>
                </button>
              ) : (
                <form onSubmit={handleApplyPromo} className="promo-input-form">
                  <div className="promo-field-group">
                    <input
                      type="text"
                      placeholder="Enter promo code (e.g. DISCOUNT10)"
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value)}
                      className="promo-text-field"
                    />
                    <button type="submit" className="promo-btn-submit">
                      Apply
                    </button>
                  </div>
                  {promoMessage && (
                    <div className={`promo-feedback ${promoMessage.type}`}>
                      {promoMessage.text}
                    </div>
                  )}
                </form>
              )}
            </div>

            {/* Trust Assurance List */}
            <div className="summary-trust-perks">
              <div className="trust-perk-item">
                <ShieldCheck size={18} className="perk-icon" />
                <div className="perk-text">
                  <strong>Secure Checkout</strong>
                  <span>256-bit SSL encrypted payment</span>
                </div>
              </div>
              <div className="trust-perk-item">
                <RefreshCw size={18} className="perk-icon" />
                <div className="perk-text">
                  <strong>30-Day Easy Returns</strong>
                  <span>Hassle-free refund guarantee</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

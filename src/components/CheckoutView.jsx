import React, { useState } from 'react';
import { ArrowLeft, Truck, Clock, AlertCircle, CreditCard, HelpCircle, Lock, Smartphone, Banknote } from 'lucide-react';

export default function CheckoutView({
  cart,
  subtotal,
  discount,
  shippingMethod,
  setShippingMethod,
  shippingFee,
  grandTotal,
  appliedPromo,
  onBackToCart,
  onPlaceOrder
}) {
  // Customer Form Data
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    countryCode: '+855',
    phone: '',
    address: '',
    city: 'Phnom Penh',
    state: 'Phnom Penh',
    description: '',
    saveInfo: true,
    paymentMethod: 'card', // 'card' | 'khqr' | 'cod'
    cardNumber: '',
    cardExpiry: '',
    cardCvc: ''
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const validateField = (name, value) => {
    switch (name) {
      case 'firstName':
        if (!value.trim()) return 'First name is required';
        if (value.trim().length < 2) return 'Must be at least 2 characters';
        return '';
      case 'lastName':
        if (!value.trim()) return 'Last name is required';
        return '';
      case 'email':
        if (!value.trim()) return 'Email is required';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Invalid email address';
        return '';
      case 'phone':
        if (!value.trim()) return 'Phone number is required';
        if (!/^[0-9+()-\s]{7,15}$/.test(value)) return 'Invalid phone number';
        return '';
      case 'address':
        if (!value.trim()) return 'Delivery address is required';
        return '';
      case 'city':
        if (!value.trim()) return 'City is required';
        return '';
      case 'cardNumber':
        if (formData.paymentMethod === 'card' && !value.trim()) return 'Card number is required';
        return '';
      case 'cardExpiry':
        if (formData.paymentMethod === 'card' && !value.trim()) return 'MM/YY required';
        return '';
      case 'cardCvc':
        if (formData.paymentMethod === 'card' && !value.trim()) return 'CVC required';
        return '';
      default:
        return '';
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === 'checkbox' ? checked : value;
    setFormData((prev) => ({ ...prev, [name]: val }));

    if (touched[name]) {
      const error = validateField(name, val);
      setErrors((prev) => ({ ...prev, [name]: error }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const fieldsToValidate = ['firstName', 'lastName', 'email', 'phone', 'address', 'city'];
    if (formData.paymentMethod === 'card') {
      fieldsToValidate.push('cardNumber', 'cardExpiry', 'cardCvc');
    }

    const newErrors = {};
    let isValid = true;

    fieldsToValidate.forEach((field) => {
      const error = validateField(field, formData[field] || '');
      if (error) {
        newErrors[field] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    setTouched(
      fieldsToValidate.reduce((acc, field) => ({ ...acc, [field]: true }), {})
    );

    if (isValid) {
      onPlaceOrder(formData);
    } else {
      const firstErrorKey = Object.keys(newErrors)[0];
      const element = document.getElementById(firstErrorKey);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        element.focus();
      }
    }
  };

  const handleAutoFill = () => {
    setFormData({
      firstName: 'Sokha',
      lastName: 'Mean',
      email: 'sokha.mean@example.com',
      countryCode: '+855',
      phone: '12 345 678',
      address: 'Street 2004, Sangkat Teuk Thla, Khan Sen Sok',
      city: 'Phnom Penh',
      state: 'Phnom Penh',
      description: 'Leave at front reception counter.',
      saveInfo: true,
      paymentMethod: 'card',
      cardNumber: '4242 •••• •••• 4242',
      cardExpiry: '12/28',
      cardCvc: '888'
    });
    setErrors({});
  };

  const estimatedTax = 0.00;

  return (
    <div className="checkout-page-container">
      {/* Top Header Bar */}
      <div className="checkout-top-header">
        <div>
          <h1 className="checkout-main-title">Shipping & Checkout</h1>
          <p className="checkout-subtitle">Please complete your delivery and payment details below</p>
        </div>
        <div className="checkout-header-buttons">
          <button type="button" className="btn-autofill-ghost" onClick={handleAutoFill}>
            ⚡ Demo Auto-Fill
          </button>
          <button type="button" className="btn-back-cart-link" onClick={onBackToCart}>
            <ArrowLeft size={16} />
            <span>Return to Cart</span>
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} noValidate className="checkout-split-layout">
        {/* Left Column: Form Details */}
        <div className="checkout-form-column">
          {/* Section 1: Shipping Address (Matching Page 3 Slide) */}
          <div className="checkout-section-card">
            <div className="section-card-header">
              <span className="section-step-badge">1</span>
              <div>
                <h2 className="section-card-heading">Shipping Address</h2>
                <p className="section-card-sub">Where should we deliver your order?</p>
              </div>
            </div>

            <div className="form-fields-grid">
              {/* First Name & Last Name */}
              <div className="field-group">
                <label htmlFor="firstName">
                  First Name <span className="req-dot">*</span>
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  placeholder="e.g. Divyansh"
                  value={formData.firstName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`styled-input ${errors.firstName ? 'error-border' : ''}`}
                />
                {errors.firstName && (
                  <span className="validation-error-msg">
                    <AlertCircle size={12} /> {errors.firstName}
                  </span>
                )}
              </div>

              <div className="field-group">
                <label htmlFor="lastName">
                  Last Name <span className="req-dot">*</span>
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  placeholder="e.g. Agarwal"
                  value={formData.lastName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`styled-input ${errors.lastName ? 'error-border' : ''}`}
                />
                {errors.lastName && (
                  <span className="validation-error-msg">
                    <AlertCircle size={12} /> {errors.lastName}
                  </span>
                )}
              </div>

              {/* Email */}
              <div className="field-group">
                <label htmlFor="email">
                  Email Address <span className="req-dot">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`styled-input ${errors.email ? 'error-border' : ''}`}
                />
                {errors.email && (
                  <span className="validation-error-msg">
                    <AlertCircle size={12} /> {errors.email}
                  </span>
                )}
              </div>

              {/* Phone with Country Code */}
              <div className="field-group">
                <label htmlFor="phone">
                  Phone Number <span className="req-dot">*</span>
                </label>
                <div className="phone-input-combo">
                  <select
                    name="countryCode"
                    value={formData.countryCode}
                    onChange={handleChange}
                    className="country-code-select"
                  >
                    <option value="+855">KH +855</option>
                    <option value="+1">US +1</option>
                    <option value="+91">IND +91</option>
                    <option value="+65">SG +65</option>
                    <option value="+66">TH +66</option>
                  </select>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    placeholder="12 345 678"
                    value={formData.phone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`styled-input phone-text-input ${errors.phone ? 'error-border' : ''}`}
                  />
                </div>
                {errors.phone && (
                  <span className="validation-error-msg">
                    <AlertCircle size={12} /> {errors.phone}
                  </span>
                )}
              </div>

              {/* Street Address */}
              <div className="field-group span-two">
                <label htmlFor="address">
                  Street Address <span className="req-dot">*</span>
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  placeholder="Street address, building, suite or floor"
                  value={formData.address}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`styled-input ${errors.address ? 'error-border' : ''}`}
                />
                {errors.address && (
                  <span className="validation-error-msg">
                    <AlertCircle size={12} /> {errors.address}
                  </span>
                )}
              </div>

              {/* City */}
              <div className="field-group">
                <label htmlFor="city">
                  City <span className="req-dot">*</span>
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  placeholder="Bangalore / Phnom Penh"
                  value={formData.city}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`styled-input ${errors.city ? 'error-border' : ''}`}
                />
                {errors.city && (
                  <span className="validation-error-msg">
                    <AlertCircle size={12} /> {errors.city}
                  </span>
                )}
              </div>

              {/* State */}
              <div className="field-group">
                <label htmlFor="state">State / Province</label>
                <input
                  type="text"
                  id="state"
                  name="state"
                  placeholder="Karnataka / Phnom Penh"
                  value={formData.state}
                  onChange={handleChange}
                  className="styled-input"
                />
              </div>

              {/* Description / Instructions */}
              <div className="field-group span-two">
                <label htmlFor="description">Delivery Description / Notes</label>
                <textarea
                  id="description"
                  name="description"
                  rows={2}
                  placeholder="Enter a description or delivery instructions..."
                  value={formData.description}
                  onChange={handleChange}
                  className="styled-input styled-textarea"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Shipping Method (Matches Slide 3) */}
          <div className="checkout-section-card">
            <div className="section-card-header">
              <span className="section-step-badge">2</span>
              <div>
                <h2 className="section-card-heading">Shipping Method</h2>
                <p className="section-card-sub">Choose your preferred delivery speed</p>
              </div>
            </div>

            <div className="shipping-tier-grid">
              {/* Free Shipping */}
              <label 
                className={`shipping-tier-card ${shippingMethod === 'free' ? 'tier-active' : ''}`}
              >
                <input
                  type="radio"
                  name="shippingMethod"
                  value="free"
                  checked={shippingMethod === 'free'}
                  onChange={() => setShippingMethod('free')}
                  className="tier-radio-input"
                />
                <div className="tier-radio-custom" />
                <div className="tier-info">
                  <div className="tier-title-row">
                    <span className="tier-name">Free Shipping</span>
                    <span className="tier-price">$0</span>
                  </div>
                  <div className="tier-time-row">
                    <Clock size={13} />
                    <span>7 - 20 Days</span>
                  </div>
                </div>
              </label>

              {/* Express Shipping */}
              <label 
                className={`shipping-tier-card ${shippingMethod === 'express' ? 'tier-active' : ''}`}
              >
                <input
                  type="radio"
                  name="shippingMethod"
                  value="express"
                  checked={shippingMethod === 'express'}
                  onChange={() => setShippingMethod('express')}
                  className="tier-radio-input"
                />
                <div className="tier-radio-custom" />
                <div className="tier-info">
                  <div className="tier-title-row">
                    <span className="tier-name">Express Shipping</span>
                    <span className="tier-price">$9</span>
                  </div>
                  <div className="tier-time-row">
                    <Truck size={13} />
                    <span>1 - 3 Days</span>
                  </div>
                </div>
              </label>
            </div>
          </div>

          {/* Section 3: Payment Method */}
          <div className="checkout-section-card">
            <div className="section-card-header">
              <span className="section-step-badge">3</span>
              <div>
                <h2 className="section-card-heading">Payment Method</h2>
                <p className="section-card-sub">Select your preferred payment channel</p>
              </div>
            </div>

            <div className="payment-method-selector">
              <button
                type="button"
                className={`payment-tab-btn ${formData.paymentMethod === 'card' ? 'tab-selected' : ''}`}
                onClick={() => setFormData(prev => ({ ...prev, paymentMethod: 'card' }))}
              >
                <CreditCard size={18} />
                <span>Credit / Debit Card</span>
              </button>
              <button
                type="button"
                className={`payment-tab-btn ${formData.paymentMethod === 'khqr' ? 'tab-selected' : ''}`}
                onClick={() => setFormData(prev => ({ ...prev, paymentMethod: 'khqr' }))}
              >
                <Smartphone size={18} />
                <span>ABA / KHQR Pay</span>
              </button>
              <button
                type="button"
                className={`payment-tab-btn ${formData.paymentMethod === 'cod' ? 'tab-selected' : ''}`}
                onClick={() => setFormData(prev => ({ ...prev, paymentMethod: 'cod' }))}
              >
                <Banknote size={18} />
                <span>Cash on Delivery</span>
              </button>
            </div>

            {formData.paymentMethod === 'card' && (
              <div className="card-payment-subform">
                <div className="field-group span-two">
                  <label htmlFor="cardNumber">Card Number</label>
                  <input
                    type="text"
                    id="cardNumber"
                    name="cardNumber"
                    placeholder="4242 •••• •••• 4242"
                    value={formData.cardNumber}
                    onChange={handleChange}
                    className="styled-input"
                  />
                  {errors.cardNumber && (
                    <span className="validation-error-msg">
                      <AlertCircle size={12} /> {errors.cardNumber}
                    </span>
                  )}
                </div>

                <div className="card-dual-grid">
                  <div className="field-group">
                    <label htmlFor="cardExpiry">Expiration (MM/YY)</label>
                    <input
                      type="text"
                      id="cardExpiry"
                      name="cardExpiry"
                      placeholder="12/28"
                      value={formData.cardExpiry}
                      onChange={handleChange}
                      className="styled-input"
                    />
                  </div>
                  <div className="field-group">
                    <label htmlFor="cardCvc">CVC / CVV</label>
                    <input
                      type="text"
                      id="cardCvc"
                      name="cardCvc"
                      placeholder="888"
                      value={formData.cardCvc}
                      onChange={handleChange}
                      className="styled-input"
                    />
                  </div>
                </div>
              </div>
            )}

            {formData.paymentMethod === 'khqr' && (
              <div className="khqr-preview-box">
                <p>📲 Scan with any banking app (ABA Mobile, Wing, ACLEDA, Bakong) upon final confirmation.</p>
              </div>
            )}

            {formData.paymentMethod === 'cod' && (
              <div className="cod-preview-box">
                <p>💵 Pay with cash upon delivery at your doorstep.</p>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Your Cart Summary (Matches Page 3 Screenshot) */}
        <div className="checkout-summary-column">
          <div className="checkout-sticky-summary">
            <h2 className="summary-title-top">Your Cart</h2>

            {/* Item List */}
            <div className="checkout-items-scroll">
              {cart.map((item) => (
                <div key={item.id} className="checkout-mini-item">
                  <div className="mini-thumb-container">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="mini-item-thumb"
                      onError={(e) => {
                        e.currentTarget.src = "https://images.unsplash.com/photo-1526738549149-8e07eca6c147?auto=format&fit=crop&w=150&q=80";
                      }}
                    />
                    <span className="mini-thumb-badge">{item.quantity}</span>
                  </div>

                  <div className="mini-item-details">
                    <h4 className="mini-item-name">{item.name}</h4>
                    <span className="mini-item-variant">{item.category}</span>
                  </div>

                  <div className="mini-item-total-col">
                    <span className="mini-item-price-sum">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Calculations Breakdown */}
            <div className="summary-breakdown-box">
              <div className="breakdown-row">
                <span className="row-title">Subtotal</span>
                <span className="row-amount">${subtotal.toFixed(2)}</span>
              </div>

              <div className="breakdown-row">
                <span className="row-title">Shipping</span>
                <span className="row-amount">
                  {shippingFee === 0 ? '$0' : `$${shippingFee.toFixed(2)}`}
                </span>
              </div>

              <div className="breakdown-row">
                <span className="row-title info-flex">
                  <span>Estimated taxes</span>
                  <HelpCircle size={13} className="info-icon" />
                </span>
                <span className="row-amount">${estimatedTax.toFixed(2)}</span>
              </div>

              {discount > 0 && (
                <div className="breakdown-row discount-row">
                  <span className="row-title">Discount ({appliedPromo})</span>
                  <span className="row-amount">-${discount.toFixed(2)}</span>
                </div>
              )}

              <div className="breakdown-divider" />

              <div className="breakdown-row grand-total-row">
                <span className="total-lead">Total</span>
                <span className="total-final-price">${grandTotal.toFixed(2)}</span>
              </div>
            </div>

            {/* Place Order CTA Button */}
            <button type="submit" className="btn-place-order-black">
              <span>Continue to Payment</span>
            </button>

            <div className="ssl-lock-footer">
              <Lock size={13} />
              <span>Guaranteed safe & secure checkout</span>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

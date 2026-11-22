import React, { useState } from 'react';
import Navbar from './components/Navbar';
import ProductList from './components/ProductList';
import CartView from './components/CartView';
import CheckoutView from './components/CheckoutView';
import OrderConfirmationView from './components/OrderConfirmationView';
import { initialProducts, initialCategories } from './data/products';
import './App.css';

function App() {
  // Navigation State: 'products' | 'cart' | 'checkout' | 'confirmation'
  const [currentView, setCurrentView] = useState('products');

  // Categories & Products Data
  const [categories] = useState(initialCategories);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [products] = useState(initialProducts);

  // Cart State (Starts empty by default)
  const [cart, setCart] = useState([]);

  // Shipping Method: 'free' ($0) | 'express' ($9)
  const [shippingMethod, setShippingMethod] = useState('free');

  // Promo code
  const [appliedPromo, setAppliedPromo] = useState(null);

  // Order Counter (Slide 28 specifies: ORD-0001)
  const [orderCounter, setOrderCounter] = useState(1);
  const [currentOrder, setCurrentOrder] = useState(null);

  // Toast notification state
  const [toast, setToast] = useState(null);

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(null), 3000);
  };

  // Cart operations
  const handleAddToCart = (product) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === product.id);
      if (existing) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
    showToast(`Added ${product.name} to Cart`);
  };

  const handleUpdateQty = (productId, newQty) => {
    if (newQty <= 0) {
      handleRemoveItem(productId);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity: newQty } : item
      )
    );
  };

  const handleRemoveItem = (productId) => {
    const item = cart.find((i) => i.id === productId);
    setCart((prevCart) => prevCart.filter((i) => i.id !== productId));
    if (item) {
      showToast(`Removed ${item.name} from Cart`);
    }
  };

  const handleClearCart = () => {
    setCart([]);
    showToast('Cart cleared');
  };

  const handleApplyPromo = (code) => {
    const cleanCode = code.trim().toUpperCase();
    if (cleanCode === 'DISCOUNT10') {
      setAppliedPromo('DISCOUNT10 (10% Off)');
      showToast('10% Discount applied!');
      return { success: true, message: 'Success! 10% discount applied to subtotal.' };
    } else if (cleanCode === 'SAVE20') {
      setAppliedPromo('SAVE20 ($20 Off)');
      showToast('$20 Discount applied!');
      return { success: true, message: 'Success! $20 discount applied to subtotal.' };
    } else {
      return { success: false, message: 'Invalid promo code. Try DISCOUNT10 or SAVE20' };
    }
  };

  // Totals calculations
  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shippingFee = shippingMethod === 'express' ? 9.0 : 0.0;

  // Calculate discount based on applied promo
  let discount = 0;
  if (appliedPromo && appliedPromo.includes('10%')) {
    discount = subtotal * 0.1;
  } else if (appliedPromo && appliedPromo.includes('$20')) {
    discount = Math.min(20, subtotal);
  }

  const grandTotal = Math.max(0, subtotal + shippingFee - discount);
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  // Exercise 2 -> Exercise 3 Order Placement
  const handlePlaceOrder = (customerData) => {
    const formattedId = `ORD-${String(orderCounter).padStart(4, '0')}`;
    const now = new Date();
    const formattedDate = now.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    const newOrder = {
      orderId: formattedId,
      customerName: `${customerData.firstName} ${customerData.lastName}`,
      email: customerData.email,
      phone: customerData.phone,
      shippingAddress: customerData.address,
      city: customerData.city,
      state: customerData.state,
      zipCode: customerData.zipCode,
      shippingMethod: shippingMethod === 'express' ? 'Express Shipping (1-3 Days)' : 'Free Shipping (7-20 Days)',
      shippingFee: shippingFee,
      items: [...cart],
      subtotal: subtotal,
      discount: discount,
      totalAmount: grandTotal,
      orderStatus: 'Pending',
      orderDate: formattedDate
    };

    setCurrentOrder(newOrder);
    setOrderCounter((prev) => prev + 1);
    setCart([]); // Clear cart upon placing order
    setCurrentView('confirmation');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="app-layout">
      {/* Toast Notification */}
      {toast && (
        <div className="app-toast">
          <span>{toast}</span>
        </div>
      )}

      {/* Header & Navigation */}
      <Navbar
        currentView={currentView}
        setCurrentView={setCurrentView}
        cartCount={cartCount}
        cartTotal={grandTotal}
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      {/* Main Content View Switcher */}
      <main className="container main-content-area">
        {currentView === 'products' && (
          <ProductList
            products={products}
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            cart={cart}
            onAddToCart={handleAddToCart}
            onGoToCart={() => {
              setCurrentView('cart');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {currentView === 'cart' && (
          <CartView
            cart={cart}
            onUpdateQty={handleUpdateQty}
            onRemoveItem={handleRemoveItem}
            onClearCart={handleClearCart}
            onProceedToCheckout={() => {
              setCurrentView('checkout');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onContinueShopping={() => {
              setCurrentView('products');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            subtotal={subtotal}
            discount={discount}
            shippingFee={shippingFee}
            grandTotal={grandTotal}
            appliedPromo={appliedPromo}
            onApplyPromo={handleApplyPromo}
          />
        )}

        {currentView === 'checkout' && (
          <CheckoutView
            cart={cart}
            subtotal={subtotal}
            discount={discount}
            shippingMethod={shippingMethod}
            setShippingMethod={setShippingMethod}
            shippingFee={shippingFee}
            grandTotal={grandTotal}
            appliedPromo={appliedPromo}
            onBackToCart={() => {
              setCurrentView('cart');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onPlaceOrder={handlePlaceOrder}
          />
        )}

        {currentView === 'confirmation' && (
          <OrderConfirmationView
            order={currentOrder}
            onContinueShopping={() => {
              setCurrentView('products');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}
      </main>

      {/* Modern Professional Footer */}
      <footer className="site-footer">
        <div className="container footer-grid">
          <div className="footer-col brand-col">
            <span className="footer-brand-title">TechStore</span>
            <p className="footer-tagline">
              Premium computing devices and hardware accessories engineered for speed, reliability, and everyday productivity.
            </p>
          </div>

          <div className="footer-col">
            <h4 className="footer-heading">Products</h4>
            <ul className="footer-links-list">
              <li>
                <button
                  type="button"
                  className="footer-link-btn"
                  onClick={() => {
                    setSelectedCategory('All');
                    setCurrentView('products');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                >
                  All Products
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="footer-link-btn"
                  onClick={() => {
                    setSelectedCategory('Laptops');
                    setCurrentView('products');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                >
                  Laptops
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="footer-link-btn"
                  onClick={() => {
                    setSelectedCategory('Accessories');
                    setCurrentView('products');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                >
                  Accessories
                </button>
              </li>
            </ul>
          </div>

          <div className="footer-col">
            <h4 className="footer-heading">Customer Care</h4>
            <ul className="footer-links-list">
              <li><span>Free Express Shipping</span></li>
              <li><span>30-Day Money-Back Guarantee</span></li>
              <li><span>24/7 Dedicated Support</span></li>
            </ul>
          </div>

          <div className="footer-col newsletter-col">
            <h4 className="footer-heading">Stay Connected</h4>
            <p className="footer-subtext">
              Subscribe to get special discounts and release notifications.
            </p>
            <form onSubmit={(e) => { e.preventDefault(); showToast('Subscribed to newsletter!'); }} className="footer-subscribe-form">
              <input
                type="email"
                placeholder="Enter your email"
                className="footer-sub-input"
                required
              />
              <button type="submit" className="footer-sub-btn">
                Join
              </button>
            </form>
          </div>
        </div>

        <div className="footer-bottom-bar">
          <div className="container footer-bottom-flex">
            <span>© 2026 TechStore Inc. All rights reserved.</span>
            <div className="footer-trust-tags">
              <span>🔒 256-Bit SSL Encrypted</span>
              <span className="dot-sep">•</span>
              <span>Privacy Policy</span>
              <span className="dot-sep">•</span>
              <span>Terms of Service</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;

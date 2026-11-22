import React from 'react';
import { CheckCircle, Calendar, Hash, User, Package, Printer, ArrowRight, Clock } from 'lucide-react';

export default function OrderConfirmationView({
  order,
  onContinueShopping
}) {
  if (!order) {
    return (
      <div className="empty-cart-state">
        <h2>No Recent Order Found</h2>
        <p>Please place an order to see confirmation details.</p>
        <button className="btn-primary" onClick={onContinueShopping}>
          Go to Store
        </button>
      </div>
    );
  }

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="confirmation-page">
      <div className="confirmation-card">
        {/* Success Header */}
        <div className="confirmation-hero">
          <div className="success-icon-wrap">
            <CheckCircle size={64} className="icon-success" />
          </div>
          {/* Requirement: Message: Order Placed Successfully! */}
          <h1 className="confirmation-title">Order Placed Successfully!</h1>
          <p className="confirmation-subtitle">
            Thank you for your purchase. We have received your order and are getting it ready.
          </p>
        </div>

        {/* Order Meta Info Grid */}
        <div className="order-meta-grid">
          {/* Requirement: Order ID: ORD-0001 */}
          <div className="meta-card">
            <div className="meta-icon"><Hash size={18} /></div>
            <div className="meta-info">
              <span className="meta-label">Order ID</span>
              <span className="meta-value order-id-highlight">{order.orderId}</span>
            </div>
          </div>

          {/* Requirement: Customer Name */}
          <div className="meta-card">
            <div className="meta-icon"><User size={18} /></div>
            <div className="meta-info">
              <span className="meta-label">Customer Name</span>
              <span className="meta-value">{order.customerName}</span>
            </div>
          </div>

          {/* Requirement: Order Date */}
          <div className="meta-card">
            <div className="meta-icon"><Calendar size={18} /></div>
            <div className="meta-info">
              <span className="meta-label">Order Date</span>
              <span className="meta-value">{order.orderDate}</span>
            </div>
          </div>

          {/* Requirement: Order Status: Pending */}
          <div className="meta-card">
            <div className="meta-icon"><Clock size={18} /></div>
            <div className="meta-info">
              <span className="meta-label">Order Status</span>
              <span className="status-badge-pending">
                <span className="status-dot"></span>
                {order.orderStatus}
              </span>
            </div>
          </div>
        </div>

        {/* Shipping & Contact Summary */}
        <div className="customer-summary-panel">
          <div className="customer-summary-item">
            <span className="panel-label">Delivery Address:</span>
            <span className="panel-text">{order.shippingAddress}, {order.city}{order.state ? `, ${order.state}` : ''}</span>
          </div>
          <div className="customer-summary-item">
            <span className="panel-label">Contact:</span>
            <span className="panel-text">{order.email} | {order.phone}</span>
          </div>
          <div className="customer-summary-item">
            <span className="panel-label">Shipping Method:</span>
            <span className="panel-text">{order.shippingMethod} (${order.shippingFee.toFixed(2)})</span>
          </div>
        </div>

        {/* Requirement: Ordered Products */}
        <div className="ordered-products-section">
          <div className="ordered-products-header">
            <Package size={20} />
            <h2 className="section-title">Ordered Products</h2>
          </div>

          <div className="table-responsive">
            <table className="order-items-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th className="text-center">Unit Price</th>
                  <th className="text-center">Quantity</th>
                  <th className="text-right">Line Total</th>
                </tr>
              </thead>
              <tbody>
                {order.items.map((item) => (
                  <tr key={item.id}>
                    <td className="product-cell">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="order-item-img"
                        onError={(e) => {
                          e.currentTarget.src = "https://images.unsplash.com/photo-1526738549149-8e07eca6c147?auto=format&fit=crop&w=150&q=80";
                        }}
                      />
                      <div>
                        <div className="table-product-name">{item.name}</div>
                        <div className="table-product-cat">{item.category}</div>
                      </div>
                    </td>
                    <td className="text-center">${item.price.toFixed(2)}</td>
                    <td className="text-center">
                      <span className="qty-tag">× {item.quantity}</span>
                    </td>
                    <td className="text-right font-semibold">
                      ${(item.price * item.quantity).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pricing Totals */}
          <div className="order-totals-box">
            <div className="total-line">
              <span>Subtotal:</span>
              <span>${order.subtotal.toFixed(2)}</span>
            </div>
            <div className="total-line">
              <span>Shipping:</span>
              <span>${order.shippingFee.toFixed(2)}</span>
            </div>
            {order.discount > 0 && (
              <div className="total-line discount-text">
                <span>Discount:</span>
                <span>-${order.discount.toFixed(2)}</span>
              </div>
            )}
            <div className="total-line grand-total-line">
              {/* Requirement: Total Amount */}
              <span>Total Amount:</span>
              <span className="grand-price">${order.totalAmount.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="confirmation-actions no-print">
          <button className="btn-secondary" onClick={handlePrint}>
            <Printer size={18} />
            <span>Print Order Receipt</span>
          </button>

          <button className="btn-primary" onClick={onContinueShopping}>
            <span>Continue Shopping</span>
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}

import { useState } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group"; 
import './catalog.css';

const Catalog = () => {
  const data = [
    { name: "Tomato", unitPrice: 100 },
    { name: "Potato", unitPrice: 200 },
    { name: "Chillies", unitPrice: 100 },
    { name: "Bread", unitPrice: 50 },
    { name: "Oil", unitPrice: 150 },
    { name: "Turmeric", unitPrice: 24 },
    { name: "Salt", unitPrice: 45 },
  ];

  const [cart, setCart] = useState([]);
  const [quantity, setQuantity] = useState({});
  const [showAll, setShowAll] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [orderId, setOrderId] = useState(localStorage.getItem("orderId") || 1);
  const [popupData, setPopupData] = useState(null); 
  const [toastMessage, setToastMessage] = useState("");

  const GST_RATE = 0.18;


  const addToCart = (item) => {
    const existingItem = cart.find((cartItem) => cartItem.name === item.name);
    if (!existingItem) {
      setCart([...cart, { ...item, qty: quantity[item.name] || 1 }]);
    }
  };

  // Remove items
  const removeFromCart = (itemName) => {
    setCart(cart.filter(item => item.name !== itemName));
  };


  const updateQuantity = (itemName, newQty) => {
    setQuantity((prevQuantities) => ({
      ...prevQuantities,
      [itemName]: newQty,
    }));
  };

  // Get the items to display first 3 items or all
  const itemsToDisplay = showAll ? data : data.slice(0, 3);


  const handleOrder = () => {

    const cartDataForPopup = {
      cartItems: cart,
      totalItems: cart.length,
      totalQuantity: cart.reduce((acc, item) => acc + item.qty, 0),
      orderId,
      dateTime: getCurrentDateTime(),
    };


    setPopupData(cartDataForPopup);

   
    localStorage.setItem("orderId", orderId + 1);
    setOrderId(orderId + 1);


    setCart([]);
    
  
    setShowPopup(true);

  
    setToastMessage("Payment Successful!");
    setTimeout(() => setToastMessage(""), 3000);
  };

  // for time and data format displaying
  const getCurrentDateTime = () => {
    const now = new Date();
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const year = now.getFullYear();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    return `${day}:${month}:${year} ${hours}:${minutes}:${seconds}`;
  };

  return (
    <div className="catalog-container">
    
      {toastMessage && (
        <div className="toast">{toastMessage}</div>
      )}

      <h3 className="catalog-title">CATALOG</h3>
      <div className="catalog-row">
        {/* Left Panel */}
        <div className="catalog-items">
          <div className="cardA">
            {itemsToDisplay.map((item) => (
              <div key={item.name} className="catalog-item">
                <div className="item-details">
                  <h5>{item.name}</h5>
                  <input
                    type="number"
                    value={quantity[item.name] || 0}
                    onChange={(e) => updateQuantity(item.name, parseInt(e.target.value))}
                    min="1"
                    max="100"
                    className="quantity-input"
                  />
                </div>
                <div className="item-actions">
                  <p className="item-price">Price: Rs.{item.unitPrice}</p>
                  {cart.some((cartItem) => cartItem.name === item.name) ? (
                    <button className="added-button" disabled>
                      Added
                    </button>
                  ) : (
                    <button
                      onClick={() => addToCart(item)}
                      className="add-to-cart-button"
                    >
                      Add to Cart
                    </button>
                  )}
                </div>
              </div>
            ))}
            <div className="see-more-less-btn">
              {!showAll ? (
                <button
                  className="see-more-button"
                  onClick={() => setShowAll(true)}
                >
                  See More
                </button>
              ) : (
                <button
                  className="see-less-button"
                  onClick={() => setShowAll(false)}
                >
                  See Less
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Right Panel */}
        <div className="cart-summary">
          <h5 className="cart-heading">Your Cart</h5>
          <div className="card1">
            {cart.length === 0 ? (
              <p>Your cart is empty.</p>
            ) : (
              <div>
                <div className="cart-item-header">
                  <span>Item</span>
                  <span>Price</span>
                  <span>Quant.</span>
                  <span>Total</span>
                  <span>Actions</span>
                </div>
                <TransitionGroup className="cart-items-list">
                  {cart.map((item) => (
                    <CSSTransition key={item.name} timeout={300} classNames="fade">
                      <div className="cart-item">
                        <span>{item.name}</span>
                        <span>Rs.{item.unitPrice}</span>
                        <span>{item.qty}</span>
                        <span>Rs.{item.unitPrice * item.qty}</span>
                        <button
                          onClick={() => removeFromCart(item.name)}
                          className="remove-item-button"
                        >
                          &times;
                        </button>
                      </div>
                    </CSSTransition>
                  ))}
                </TransitionGroup>
                <div className="cart-total">
                  <span>Grand Total:</span>
                  <span>Rs.{cart.reduce((acc, item) => acc + item.unitPrice * item.qty, 0)}</span>
                </div>
                <div className="cart-total">
                  <span>GST (18%):</span>
                  <span>Rs.{(cart.reduce((acc, item) => acc + item.unitPrice * item.qty, 0) * GST_RATE).toFixed(2)}</span>
                </div>
                <div className="cart-total">
                  <span>Total with GST:</span>
                  <span>Rs.{(cart.reduce((acc, item) => acc + item.unitPrice * item.qty, 0) * (1 + GST_RATE)).toFixed(2)}</span>
                </div>
                <div className="pay-button-container">
                  <button className="pay-button" onClick={handleOrder}>
                    Pay
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Popup Modal for Thank You */}
      {showPopup && popupData && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h4>Thank you for your Order!</h4>
            <p>Order ID: {popupData.orderId}</p>
            <p>Total items: {popupData.totalItems}</p>
            <p>Total quantity: {popupData.totalQuantity}</p>
            <p>Date and Time: {popupData.dateTime}</p>
            <button onClick={() => setShowPopup(false)} className="popup-close-button">
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Catalog;


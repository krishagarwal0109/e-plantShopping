import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';

import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  // Calculate total amount for all products in the cart
  const calculateTotalAmount = () => {
    let total=0;
    cart.forEach((item) => {
      const numericCost = parseFloat(item.cost.replace('$', ''));
      total += numericCost * item.count;
    });
    return total;
  };

  const handleContinueShopping = (e) => {
    onContinueShopping();
    }; 
  const handleCheckoutShopping = (e) => {
    alert('Functionality to be added for future reference');
  };


  const handleIncrement = (item) => {
    dispatch(updateQuantity({name:item.name,count:item.count+1}));
  };

  const handleDecrement = (item) => {
    if(item.count>1){
      dispatch(updateQuantity({name:item.name,count:item.count-1}));
  }
    else{
      dispatch(removeItem({name:item.name}));
    }
  };

  const handleRemove = (item) => {
    dispatch(removeItem({name:item.name}));
  };

  // Calculate total cost based on count for an item
  const calculateTotalCost = (item) => {
    const itemCost = parseFloat(item.cost.replace('$', ''));
    const itemtotal=itemCost*(item.count);
    return itemtotal;
  };

  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
      <div>
        {cart.map(item => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">{item.cost}</div>
              <div className="cart-item-count">
                <button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(item)}>-</button>
                <span className="cart-item-count-value">{item.count}</span>
                <button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(item)}>+</button>
              </div>
              <div className="cart-item-total">Total: ${calculateTotalCost(item)}</div>
              <button className="cart-item-delete" onClick={() => handleRemove(item)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '20px', color: 'black' }} className='total_cart_amount'></div>
      <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={(e) => handleContinueShopping(e)}>Continue Shopping</button>
        <br />
        <button className="get-started-button1">Checkout</button>
      </div>
    </div>
  );
};

export default CartItem;



import React, { useContext } from 'react'
import './Cart.css'
import { StoreContext } from '../../context/StoreContext'
import { useNavigate } from 'react-router-dom'

const Cart = () => {
  const { cartItems, food_list, removeFromCart, getTotalCartAmount, url } = useContext(StoreContext)
  const navigate = useNavigate()

  const cartFoodList = food_list.filter(item => cartItems[item._id] > 0)

  return (
    <div className='cart'>
      <h1 className="cart-title">Your Cart</h1>
      <div className="cart-items">
        {cartFoodList.length === 0 ? (
          <div className="cart-empty">
            <div className="cart-empty-icon">🛒</div>
            <h3>Your cart is empty</h3>
            <p>Add some delicious dishes to get started</p>
          </div>
        ) : (
          <>
            <div className="cart-items-title">
              <p></p>
              <p>Item</p>
              <p>Price</p>
              <p>Qty</p>
              <p>Total</p>
              <p></p>
            </div>
            {cartFoodList.map((item, index) => (
              <div key={item._id}>
                <div className='cart-items-item'>
                  <img src={url + "/images/" + item.image} alt={item.name} />
                  <p className="item-name">{item.name}</p>
                  <p className="item-price">₹{item.price}</p>
                  <p className="item-qty">{cartItems[item._id]}</p>
                  <p className="item-total">₹{item.price * cartItems[item._id]}</p>
                  <span onClick={() => removeFromCart(item._id)} className='cross'>×</span>
                </div>
                {index < cartFoodList.length - 1 && <hr className="cart-row-divider" />}
              </div>
            ))}
          </>
        )}
      </div>

      {cartFoodList.length > 0 && (
        <div className="cart-bottom">
          <div className="cart-total">
            <h2>Order Summary</h2>
            <div>
              <div className="cart-total-details">
                <p>Subtotal</p>
                <p>₹{getTotalCartAmount()}</p>
              </div>
              <hr />
              <div className="cart-total-details">
                <p>Delivery Fee</p>
                <p>₹{getTotalCartAmount() === 0 ? 0 : 50}</p>
              </div>
              <hr />
              <div className="cart-total-details">
                <b>Total</b>
                <b>₹{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 50}</b>
              </div>
            </div>
            <button onClick={() => navigate('/order')}>Proceed to Checkout →</button>
          </div>
          <div className="cart-promocode">
            <h3>Promo Code</h3>
            <p>Have a discount code? Enter it below to save on your order.</p>
            <div className='cart-promocode-input'>
              <input type="text" placeholder='Enter promo code' />
              <button>Apply</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Cart
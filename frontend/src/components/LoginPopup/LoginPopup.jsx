import React, { useContext, useState } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext'
import axios from "axios"
import { toast } from "react-toastify"

const LoginPopup = ({ setShowLogin }) => {
  const { url, setToken } = useContext(StoreContext)
  const [currState, setCurrState] = useState("Login")
  const [data, setData] = useState({ name: "", email: "", password: "" })

  const onChangeHandler = (e) => {
    const { name, value } = e.target
    setData(d => ({ ...d, [name]: value }))
  }

  const onLogin = async (e) => {
    e.preventDefault()
    const endpoint = currState === "Login" ? "/api/user/login" : "/api/user/register"
    const response = await axios.post(url + endpoint, data)
    if (response.data.success) {
      setToken(response.data.token)
      localStorage.setItem("token", response.data.token)
      toast.success(currState === "Login" ? "Welcome back!" : "Account created!")
      setShowLogin(false)
    } else {
      toast.error(response.data.message)
    }
  }

  return (
    <div className='login-popup'>
      <form onSubmit={onLogin} className="login-popup-container">
        <div className="login-popup-title">
          <div>
            <h2>{currState === "Login" ? "Welcome back" : "Create account"}</h2>
            <p>{currState === "Login" ? "Sign in to your EasyFood account" : "Join EasyFood today"}</p>
          </div>
          <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="Close" />
        </div>
        <div className="login-popup-inputs">
          {currState !== "Login" && (
            <div className="input-group">
              <label>Full Name</label>
              <input name='name' onChange={onChangeHandler} value={data.name} type="text" placeholder='Your name' required />
            </div>
          )}
          <div className="input-group">
            <label>Email</label>
            <input name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='your@email.com' required />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input name='password' onChange={onChangeHandler} value={data.password} type="password" placeholder='••••••••' required />
          </div>
        </div>
        <button type='submit'>{currState === "Sign Up" ? "Create Account" : "Sign In"}</button>
        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>By continuing, I agree to the <strong>Terms of Use</strong> &amp; <strong>Privacy Policy</strong>.</p>
        </div>
        <p className="login-popup-switch">
          {currState === "Login"
            ? <>Don't have an account? <span onClick={() => setCurrState("Sign Up")}>Sign up free</span></>
            : <>Already have an account? <span onClick={() => setCurrState("Login")}>Sign in</span></>
          }
        </p>
      </form>
    </div>
  )
}

export default LoginPopup
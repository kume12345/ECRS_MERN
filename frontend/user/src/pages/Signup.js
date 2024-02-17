import React, { useState } from "react"
import { useSignup } from "../hooks/useSignup"
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('')
  const [nic, setNic] = useState('')
  const [email, setEmail] = useState('')
  const [role, setRole] = useState('User')
  const [username, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const {signup, error, isLoading} = useSignup()

  const handleSubmit = async (e) => {
    e.preventDefault()

    await signup(name, nic, email, role, username, password)
  }

  return (
    <form className="signup" onSubmit={handleSubmit}>
      <h3>Sign Up</h3>
      <label>Name:</label>
      <input 
        type="text" 
        onChange={(e) => setName(e.target.value)} 
        value={name} 
      />
      <label>NIC:</label>
      <input 
        type="text" 
        onChange={(e) => setNic(e.target.value)} 
        value={nic} 
      />
      <label>Email address:</label>
      <input 
        type="email" 
        onChange={(e) => setEmail(e.target.value)} 
        value={email} 
      />

      <label>Role:</label>
      <select value={role} onChange={(e)=>setRole(e.target.value)}>
        <option value="user">User</option>
      </select>
      
      <label>Username:</label>
      <input 
        type="text" 
        onChange={(e) => setUserName(e.target.value)} 
        value={username} 
      />
      <label>Password:</label>
      <input 
        type="password" 
        onChange={(e) => setPassword(e.target.value)} 
        value={password} 
      />

      <button disabled={isLoading}>Sign up</button>
      <button className="btn" onClick={() => {navigate('/login')}}>Are you already a member?</button >
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default Signup;

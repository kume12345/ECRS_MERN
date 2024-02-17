import { useState } from "react"
import { useLogin } from "../../hooks/useLogin"
import { useNavigate } from "react-router-dom";

const Unauthorized = () => {

  return (
    <div className="div3">
    <div className="error">You have not permission to reach!</div>
    </div>
    
  )
}

export default Unauthorized
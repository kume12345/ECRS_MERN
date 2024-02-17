import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from "../hooks/useAuthContext";

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useAuthContext();
  const navigate = useNavigate();
  const { user } = useAuthContext();

  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        'http://localhost:4000/api/user/login',
        { email, password },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      const json = response.data;
      console.log(json)

      if (response.status !== 200) {
        setIsLoading(false);
        setError(json.error);
        console.log('Error');
      } else {
        // Save the user to local storage
        localStorage.setItem('user', JSON.stringify(json));

        // Update the auth context
        dispatch({ type: 'LOGIN', payload: json });

        // Update loading state
        setIsLoading(false);
        if(user.role === "User"){
          navigate('/unauthorized')
        }else {
          navigate('/')
        }
      }
    } catch (error) {
      setIsLoading(false);
      setError(error.message);
      console.log('Error:', error);
    }
  };

  return { login, isLoading, error };
};

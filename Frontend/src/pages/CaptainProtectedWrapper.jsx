import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCaptain } from '../context/CaptainContext';
import axios from 'axios';

const CaptainProtectedWrapper = ({ children }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const { setCaptain } = useCaptain();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      navigate('/captain-login'); // Redirect if no token
    } else {
      // Fetch captain data after token check
      axios
        .get(`${import.meta.env.VITE_BASE_URL}/captains/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          if (response.status === 200) {
            const data = response.data;
            setCaptain(data.captain); // Store captain data
            setIsLoading(false); // Stop loading once data is fetched
          }
        })
        .catch((err) => {
          console.log(err);
          localStorage.removeItem('token'); // Remove invalid token
          navigate('/captain-login'); // Redirect to login if error occurs
        });
    }
  }, [token, navigate, setCaptain]);

  if (isLoading) {
    return <div>Loading....</div>; // Show loading indicator until data is fetched
  }

  return <>{children}</>; // Render children once data is loaded
};

export default CaptainProtectedWrapper;

import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from "react-router-dom";


export const Home = () => {

  const navigate = useNavigate()

  // Check if the user is already logged in or signed up
  const isAuthenticated = useSelector((state) => state.users.auth);

  // Redirect function
  const redirectToProfileOrSignup = () => {
    console.log('Redirecting...');
    if (isAuthenticated) {
      console.log('Redirecting to profile...');
      navigate('/profile');
    } else {
      console.log('Redirecting to signup...');
      navigate('/signup');
    }
  };
  
  
  return (
    <section 
    style={{height:"100vh"}}
    className='position-relative pb-5'>
      <img
        className='d-none d-lg-block position-absolute top-0 start-0 bottom-0 w-50 h-100 img-fluid'
        style={{ objectFit: "cover" }}
        src='https://images.pexels.com/photos/4968636/pexels-photo-4968636.jpeg?auto=compress&cs=tinysrgb&w=600'
        alt=''
      />
      <div className="position-relative">
        <div className="container">
          <div className="row pt-5">
            <div className="col-12  col-lg-5 ms-auto">
              <div className="mb-5">
                <h2 className="display-4 fw-bold mb-5">
                  Keep Track of Your Income & Expenses
                </h2>
                <p className="lead text-muted mb-5">
                  View all your income and expenses flow from your team in one dashboard
                </p>
                <div className="d-flex justify-content-center align-items-center flex-wrap">
                  <button
                    className='btn btn-primary me-2 mb-2 b-sm-0'
                    onClick={redirectToProfileOrSignup}
                  >
                    Track your performance
                  </button>
                </div>

              </div>
              <h1 className="text-danger">
                User Login
              </h1>
              <p>User name: selvam@techjays.com</p>
              <p>Password : Selvam@1998</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

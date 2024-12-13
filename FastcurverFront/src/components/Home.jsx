import React from 'react';
import { Link } from 'react-router-dom';  
import Header from './header';

const Home = () => {
  return (
    <>
      <Header />
      <div className="d-flex justify-content-center align-items-center min-vh-100 p-5">
        <div className="text-center">
          <h3>
            Welcome to Umang Mart. Please click on 
            <Link 
              to="/catalog" 
              style={{
                textDecoration: 'none',
                color: '#007bff', 
                padding: '8px 15px', 
                fontWeight: 'bold', 
              }}
              onMouseOver={(e) => e.target.style.textDecoration = 'underline'} 
              onMouseOut={(e) => e.target.style.textDecoration = 'none'}
            >
              Catalog
            </Link> 
            to start building <br></br>your cart and buy awesome items.
          </h3>

          
          <h4 
            style={{
              display: 'inline-block',
              padding: '15px',
              marginTop: '20px',
              backgroundColor: '#f9f9f9', 
              border: '2px solid #007bff', 
              borderRadius: '8px', 
              color: '#333', 
              fontSize: '1.2rem',
              fontWeight: 'bold',
              boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', 
              textAlign: 'center',
              width: '100%',
              maxWidth: '400px', 
              marginBottom: '20px', 
            }}
          >
         !  We have the best return policy of 14 days. Enjoy Benefits
          </h4>
        </div>
      </div>
    </>
  );
};

export default Home;

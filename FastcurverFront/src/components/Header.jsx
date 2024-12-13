import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
// import './FastcurverFront/src/assets/images/fastcurve.webp'

const Header = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [userDetails, setUserDetails] = useState(
    JSON.parse(localStorage.getItem("userData")) || { firstName: "John", lastName: "Doe" }
  );
  
  const profileButtonRef = useRef(null);
  const profilePopupRef = useRef(null);


  const toggleProfileDropdown = () => {
    setIsProfileOpen((prev) => !prev);
  };


  const handleLogout = () => {
    alert("Logged out");
    localStorage.removeItem("userData");
  };

  // Close the dropdown if the user clicks outside
  const handleClickOutside = (e) => {
    if (
      profileButtonRef.current &&
      !profileButtonRef.current.contains(e.target) &&
      profilePopupRef.current &&
      !profilePopupRef.current.contains(e.target)
    ) {
      setIsProfileOpen(false); // clicked outside
    }
  };


  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

 
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <header className="bg-light fixed-top w-100" style={{ zIndex: 1000, height: "60px" }}>
      <div className="container-fluid d-flex justify-content-center align-items-center" style={{ height: "60px" }}>
        <div className="logo">
          <img src="https://3.imimg.com/data3/DW/IT/MY-2996523/umang-marketing-logo.png" alt="Logo" className="img-fluid" style={{ width: "120px", height: "auto" }} />
        </div>

        <nav className="container-fluid d-flex align-items-center py-3 gap-4 ms-5">
          <Link to="/" className="text-decoration-none text-dark">
            HOME
          </Link>
          <Link to="/catalog" className="text-decoration-none text-dark">
            CATALOG
          </Link>
        </nav>

     
        <div className="d-flex align-items-center position-relative">
          <div
            className="user-icon rounded-circle d-flex justify-content-center align-items-center bg-primary text-white"
            style={{ width: "40px", height: "40px", cursor: "pointer" }}
            onClick={toggleProfileDropdown}
            ref={profileButtonRef} 
          >
            {userDetails.firstName[0]} 
          </div>

        
          {isProfileOpen && (
            <div
              className="user-popup position-absolute mt-2 p-3 bg-white shadow rounded border"
              ref={profilePopupRef} 
              style={{
                top: "100%", 
                right: 0,
                minWidth: "200px",
                borderRadius:"20px",
                transition: "transform 0.3s ease, opacity 0.3s ease",
                transform: isProfileOpen ? "translateY(0)" : "translateY(10px)", 
                opacity: isProfileOpen ? 1 : 0,
              }}
            >
              <Link className="d-block mb-2 ta-center" to="/profile">
                {`${userDetails.firstName} ${userDetails.lastName}`}
              </Link>
              <button className="btn btn-primary" onClick={handleLogout}>
                Log Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;


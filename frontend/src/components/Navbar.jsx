  import { NavLink, Link,Outlet, useNavigate } from 'react-router-dom';
  import './Navbar.css';
import { useEffect, useState } from 'react';

  const Navbar = () => {

    let [user, setUser] = useState(null);
    const navigate = useNavigate();

    // Page load hone par check karein user logged in hai ya nahi
    useEffect(() => {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    }, []);

    // Logout function
    const handleLogout = () => {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      setUser(null);
      navigate('/');
    };
    return (
      <>
      <nav className="navbar navbar-expand-lg navbar-dark fixed-top">
        <div className="container">
          <NavLink className="navbar-brand fw-bold" to="/" >
            MAZE RUNNER TECHNOLOGY<span className="text-primary">.</span>
          </NavLink>

          <button
            className="navbar-toggler border-0"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#mainNavbar"
            aria-controls="mainNavbar"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="mainNavbar">
            <ul className="navbar-nav ms-auto gap-lg-3">
              <li className="nav-item">
                <NavLink
                  className={({ isActive }) =>
                    `nav-link${isActive ? ' active' : ''}`
                  }
                  to="/"
                  end
                >
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className={({ isActive }) =>
                    `nav-link${isActive ? ' active' : ''}`
                  }
                  to="/about"
                >
                  About
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className={({ isActive }) =>
                    `nav-link${isActive ? ' active' : ''}`
                  }
                  to="/skills"
                >
                  Skills
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className={({ isActive }) =>
                    `nav-link${isActive ? ' active' : ''}`
                  }
                  to="/contact"
                >
                  Contact
                </NavLink>
              </li>
            </ul>

          {user?(<>
          <Link to="/profile" className="btn btn-primary ms-lg-3 mt-2 mt-lg-0">
            profile
            </Link>
            <Link to="/my-messages" className="btn btn-outline-light ms-lg-3 mt-2 mt-lg-0">
      Messages
    </Link>
            <Link  className="btn btn-primary ms-lg-3 mt-2 mt-lg-0"  onClick={handleLogout}>
            Logout
            </Link></>

          ):(<>
          <Link to="/register" className="btn btn-primary ms-lg-3 mt-2 mt-lg-0">
            register
            </Link>
          </>)}
          
          </div>
        </div>
      </nav>
  <Outlet/>
  </>
    );
  };

  export default Navbar;
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { logout, reset } from '../features/authSlice';
import {useDispatch, useSelector } from "react-redux";
import {toast, ToastContainer} from 'react-toastify'


import { IoClose } from "react-icons/io5";
import { BsList } from "react-icons/bs";

function Navbar() {
  const {user} = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  
  const [click, setClick] = useState(false);
  
  
    const onLogout = () => {
      toast.success('Logged out scuccessfully')
        // Delay navigation to allow toast to display
  setTimeout(() => {
    dispatch(logout());
    dispatch(reset());
    navigate('/');
  }, 2000); 
    }



  const handleClick = () => setClick(!click);



  return (
    <nav className="navbar bg-neutral-800">

      <ToastContainer />
      <div className="nav-container">
        <div className="nav-logo">
         
         <p className="text-white text-xl font-bold">BetterMind</p>
         
        </div>

        <ul
          className={`${
            click ? "nav-menu active" : "nav-menu "
          } text-gray-300 font-normal text-base bg-neutral-800`}
        >
          <li className="nav-item">
            <NavLink
              to="/"
              className={({ isActive }) => `nav-links text-gray-300${isActive ? ' active' : ''}`}
              onClick={handleClick}
            >
              Home
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="/features"
              className={({ isActive }) => `nav-links text-gray-300${isActive ? ' active' : ''}`}
              onClick={handleClick}
            >
              Features
            </NavLink>
          </li>

        



          <li className="nav-item">
            <NavLink
              to="/testimonials"
              className={({ isActive }) => `nav-links text-gray-300${isActive ? ' active' : ''}`}
              onClick={handleClick}
            >
             Testimonials
            </NavLink>
          </li>

{user ? (
  <>
    <li className="nav-item">
      <NavLink
        to="/ai-chat"
        className={({ isActive }) => `nav-links text-gray-300${isActive ? ' active' : ''}`}
        onClick={handleClick}
      >
        AI Chat
      </NavLink>
    </li>
    <li className="nav-item">
      <button onClick={onLogout}>
        LogOut
      </button>
    </li>
  </>
) : null}

         



        </ul>
        <div className="nav-icon" onClick={handleClick}>
          {click ? (
            <span className="icon">
              <IoClose size={28} className="text-red-600" />
            </span>
          ) : (
            <span className="icon">
              <BsList size={28} />
            </span>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
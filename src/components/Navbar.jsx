import React, { useEffect, useState } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";

function Navbar() {
  const [showBg, setShowBg] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setShowBg(true);
      } else {
        setShowBg(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on window resize (if screen becomes larger)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  return (
    <nav className={`navbar ${showBg ? "active" : ""}`}>
      <div className="navbar-brand">
        SafeNet
      </div>

      {/* Mobile menu toggle button */}
      <div 
        className={`mobile-menu-toggle ${mobileMenuOpen ? "active" : ""}`}
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>

      {/* Navigation items */}
      <div className={`navbar-items ${mobileMenuOpen ? "show" : ""}`}>
  <Link to="/" onClick={() => setMobileMenuOpen(false)}>Home</Link>
  <a href="#feature" onClick={() => setMobileMenuOpen(false)}>About</a>
  <Link to="/register" onClick={() => setMobileMenuOpen(false)}>Register</Link>
  <Link to="/login" onClick={() => setMobileMenuOpen(false)}>Login</Link>
</div>
    </nav>
  );
}

export default Navbar;
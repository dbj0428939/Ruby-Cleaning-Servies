import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import './App.css';
import logo from './assets/logo.svg';
import EstimatePortal from './EstimatePortal';

function App() {
  const navigate = useNavigate();

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    // Small delay to ensure DOM elements are ready
    const initializeObserver = setTimeout(() => {
      const servicesSection = document.querySelector('.services');
      const servicesTitle = document.querySelector('.services h2');
      const serviceCards = document.querySelectorAll('.service-card');
      const aboutSection = document.querySelector('.about');
      const aboutTitle = document.querySelector('.about h2');
      const aboutText = document.querySelector('.about p');

      // Reset animations by removing animate class
      [servicesSection, servicesTitle, aboutSection, aboutTitle, aboutText, ...serviceCards].forEach(element => {
        if (element) {
          element.classList.remove('animate');
        }
      });

      // Re-observe elements
      if (servicesSection) observer.observe(servicesSection);
      if (servicesTitle) observer.observe(servicesTitle);
      if (aboutSection) observer.observe(aboutSection);
      if (aboutTitle) observer.observe(aboutTitle);
      if (aboutText) observer.observe(aboutText);
      serviceCards.forEach(card => observer.observe(card));
    }, 100);

    return () => {
      clearTimeout(initializeObserver);
      observer.disconnect();
    };
  }, [location.pathname]); // Re-run when route changes

  const handleEstimateClick = () => {
    navigate('/estimate');
  };

  return (
    <div className="app">
      <header className="header">
        <div className="top-bar">
          <div className="contact-bar">
            <a href="tel:(555) 123-4567"><i className="fas fa-phone"></i> (555) 123-4567</a>
            <a href="mailto:info@rubycleaning.com"><i className="fas fa-envelope"></i> info@rubycleaning.com</a>
          </div>
          <div className="social-links">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook"></i></a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-twitter"></i></a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram"></i></a>
          </div>
        </div>
        <nav>
          <div className="logo">
            <img src={logo} alt="Ruby Cleaning Services" />
          </div>
          <ul className="nav-links">
            <li><Link to="/">Home</Link></li>
            <li>
              <a href="#services">Our Services</a>
              <div className="services-dropdown">
                <a href="#holiday">Holiday Cleaning Services</a>
                <a href="#moveinout">Move In/Out Cleaning Services</a>
                <a href="#premier">Premier Cleaning Services</a>
                <a href="#apartment">Apartment Cleaning</a>
                <a href="#office">Small Office Cleaning Services</a>
                <a href="#deep">Deep Cleaning Services</a>
                <a href="#house">House Cleaning</a>
                <a href="#disinfection">Enhanced Disinfection Services</a>
                <a href="#organization">Organizational Service</a>
                <a href="#housekeeping">Housekeeping Services</a>
              </div>
            </li>
            <li><a href="#about">About</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </nav>
      </header>

      <Routes>
        <Route path="/estimate" element={<EstimatePortal />} />
        <Route path="/" element={
          <>
            <section id="home" className="hero">
              <div className="hero-content">
                <h1>Professional Cleaning Services</h1>
                <p>Experience the difference with our expert cleaning solutions</p>
                <button className="cta-button" onClick={handleEstimateClick}>Request Free Estimate</button>
              </div>
            </section>

            <section id="services" className="services">
              <h2>Our Services</h2>
              <p className="services-summary">Experience excellence in cleanliness with Ruby Cleaning Services. Our dedicated team of professionals delivers meticulous attention to detail and outstanding results for every space we touch. From homes to offices, we provide customized cleaning solutions that exceed expectations, ensuring a pristine and healthy environment for you to thrive in.</p>
              <div className="service-grid">
                  <div className="service-card">
                    <h3><i className="fas fa-candy-cane"></i> Holiday Cleaning</h3>
                    <p>Special cleaning services for holiday seasons and events</p>
                  </div>
                  <div className="service-card">
                    <h3><i className="fas fa-truck-moving"></i> Move In/Out Cleaning</h3>
                    <p>Thorough cleaning services for moving transitions</p>
                  </div>
                  <div className="service-card">
                    <h3><i className="fas fa-crown"></i> Premier Cleaning</h3>
                    <p>Luxury cleaning service with premium attention to detail</p>
                  </div>
                  <div className="service-card">
                    <h3><i className="fas fa-building"></i> Apartment Cleaning</h3>
                    <p>Specialized cleaning solutions for apartments</p>
                  </div>
                  <div className="service-card">
                    <h3><i className="fas fa-briefcase"></i> Office Cleaning</h3>
                    <p>Professional cleaning for small office spaces</p>
                  </div>
                  <div className="service-card">
                    <h3><i className="fas fa-broom"></i> Deep Cleaning</h3>
                    <p>Thorough deep cleaning for a spotless environment</p>
                  </div>
                  <div className="service-card">
                    <h3><i className="fas fa-home"></i> House Cleaning</h3>
                    <p>Comprehensive cleaning services for homes</p>
                  </div>
                  <div className="service-card">
                    <h3><i className="fas fa-shield-virus"></i> Disinfection Services</h3>
                    <p>Enhanced cleaning with focus on sanitization</p>
                  </div>
                  <div className="service-card">
                    <h3><i className="fas fa-boxes"></i> Organization Service</h3>
                    <p>Help organize and declutter your space</p>
                  </div>
                  <div className="service-card">
                    <h3><i className="fas fa-hand-sparkles"></i> Housekeeping</h3>
                    <p>Regular maintenance and cleaning services</p>
                  </div>
                  <div className="service-card">
                    <h3><i className="fas fa-plus-circle"></i> Other Service</h3>
                    <p>Tell us about your specific cleaning needs</p>
                    <input type="text" placeholder="Describe your cleaning needs..." className="other-service-input" />
                  </div>
              </div>
            </section>

            <section id="about" className="about">
              <h2>8+ Years of Experience</h2>
              <p>Ruby Cleaning Services provides top-quality cleaning solutions with attention to detail and customer satisfaction as our priority.</p>
            </section>

            <section id="contact" className="contact">
              <h2>Contact Us</h2>
              <div className="contact-info">
                <p>Email: info@rubycleaning.com</p>
                <p>Phone: (555) 123-4567</p>
                <p>Address: 123 Clean Street, Sparkle City, SC 12345</p>
              </div>
              <div className="contact-form">
                <h3>Ready to Transform Your Space? Let's Connect!</h3>
                <form>
                  <input type="text" placeholder="Name" required />
                  <input type="tel" placeholder="Phone" required />
                  <input type="email" placeholder="Email" required />
                  <textarea placeholder="Message" required></textarea>
                  <button type="submit" className="cta-button">Send</button>
                </form>
              </div>
            </section>

            <section className="partners">
              <div className="partners-grid">
                <div className="partner-logo">
                  <img src="/partner-logos/lifetime.jpeg" alt="Lifetime Fitness" />
                </div>
                <div className="partner-logo">
                  <img src="/partner-logos/QT.jpeg" alt="QuikTrip" />
                </div>
                <div className="partner-logo">
                  <img src="/partner-logos/mcdonalds.jpeg" alt="McDonald's" />
                </div>
                <div className="partner-logo">
                  <img src="/partner-logos/sagewood.jpeg" alt="Sagewood" />
                </div>
              </div>
            </section>
          </>
        } />
      </Routes>

      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <div className="footer-logo">
              <img src={logo} alt="Ruby Cleaning Services" />
            </div>
            <p className="footer-description">Professional and reliable cleaning services for your home and business.</p>
            <div className="footer-social">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook"></i></a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-twitter"></i></a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram"></i></a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-linkedin"></i></a>
            </div>
          </div>
          
          <div className="footer-section">
            <h3>Quick Link</h3>
            <ul className="footer-links">
              <li><a href="#home">Home</a></li>
              <li><a href="#about">About Us</a></li>
              <li><a href="#services">Services</a></li>
              <li><a href="#blog">Blog</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h3>Contact Us!</h3>
            <div className="footer-contact">
              <p><i className="fas fa-map-marker-alt"></i> 2300 Loreto Dr, Fort Worth, TX 76177</p>
              <p><i className="fas fa-envelope"></i> edavidjd76@gmail.com</p>
              <p><i className="fas fa-phone"></i> +1 817-707-2429</p>
              <p><i className="fas fa-phone"></i> +1 682-433-9500</p>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 Ruby Cleaning Services. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default App

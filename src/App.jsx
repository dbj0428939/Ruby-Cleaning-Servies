import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from './contexts/TranslationContext';
import './App.css';
import logo from './assets/logo.svg';
import EstimatePortal from './EstimatePortal';
import ContactEmailForm from './ContactEmailForm';
import PhotosGallery from './PhotosGallery';

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const { t, changeLanguage } = useTranslation();

  // When other routes navigate to '/', they'll include { state: { scrollTo: '<id>' } }
  // This effect listens for that and performs a smooth scroll to the target element.
  React.useEffect(() => {
    if (location && location.state && location.state.scrollTo) {
      const id = location.state.scrollTo;
      const scrollToId = () => {
        const el = document.getElementById(id) || document.querySelector(`.${id}`) || document.querySelector(`#${id}`) || document.querySelector('.' + id);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
          // clear the navigation state so repeated visits don't re-trigger
          navigate(location.pathname, { replace: true, state: {} });
        } else {
          // retry a bit later in case DOM isn't ready yet
          setTimeout(() => {
            const el2 = document.getElementById(id) || document.querySelector(`#${id}`) || document.querySelector(`.${id}`);
            if (el2) {
              el2.scrollIntoView({ behavior: 'smooth', block: 'center' });
              navigate(location.pathname, { replace: true, state: {} });
            }
          }, 120);
        }
      };
      scrollToId();
    }
  }, [location, navigate]);

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

  const handleNavToSection = (id) => {
    // If we're already on the homepage, just scroll
    if (window.location.pathname === '/' || location.pathname === '/') {
      const el = document.getElementById(id) || document.querySelector(`#${id}`) || document.querySelector(`.${id}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        return;
      }
    }

    // Otherwise navigate to home and pass the desired id in state
    navigate('/', { state: { scrollTo: id } });
  };

  return (
    <div className="app">
      <header className="header">
        <div className="top-bar">
          <div className="contact-bar">
            <span><i className="fas fa-map-marker-alt" style={{color: '#e91e63'}}></i> 2300 Loreto Dr, Fort Worth, TX 76177</span>
            <span><i className="fas fa-envelope" style={{color: '#e91e63'}}></i> esmeralda@rubycleaningservice.com</span>
            <span><i className="fas fa-phone" style={{color: '#e91e63'}}></i> 469-993-5909</span>
          </div>
        </div>
        <nav>
          <div className="logo">
            <div className="logo-text">
              <i className="fas fa-gem logo-icon"></i>
              <span className="logo-company-name">
                <span className="logo-ruby">Ruby's</span> Cleaning Service
              </span>
            </div>
          </div>
          <ul className="nav-links">
            <li><Link to="/">{t('header.nav.home')}</Link></li>
            <li>
              <a href="#" onClick={(e) => { e.preventDefault(); handleNavToSection('services'); }}>{t('header.nav.services')}</a>
              <div className="services-dropdown">
                {[
                  { id: 'holiday', name: 'Holiday Cleaning Services' },
                  { id: 'moveinout', name: 'Move In/Out Cleaning Services' },
                  { id: 'premier', name: 'Premier Cleaning Services' },
                  { id: 'apartment', name: 'Apartment Cleaning' },
                  { id: 'office', name: 'Small Office Cleaning Services' },
                  { id: 'deep', name: 'Deep Cleaning Services' },
                  { id: 'house', name: 'House Cleaning' },
                  { id: 'disinfection', name: 'Enhanced Disinfection Services' },
                  { id: 'organization', name: 'Organizational Service' },
                  { id: 'housekeeping', name: 'Housekeeping Services' }
                ].map(service => (
                  <a
                    key={service.id}
                    href="#"
                    onClick={(e) => { e.preventDefault(); handleNavToSection(service.id); }}
                  >
                    {service.name}
                  </a>
                ))}
              </div>
            </li>
            <li><a href="#" onClick={(e) => { e.preventDefault(); handleNavToSection('about'); }}>{t('header.nav.about')}</a></li>
            <li><a href="#" onClick={(e) => { e.preventDefault(); handleNavToSection('contact'); }}>{t('header.nav.contact')}</a></li>
            <li><Link to="/photos">Photos</Link></li>
            <li>
              <a href="#" className="translate-icon">
                <i className="fas fa-globe"></i>
                <div className="language-dropdown">
                  <a href="#" onClick={(e) => { e.preventDefault(); changeLanguage('en'); }}>{t('header.languages.en')}</a>
                  <a href="#" onClick={(e) => { e.preventDefault(); changeLanguage('es'); }}>{t('header.languages.es')}</a>
                  <a href="#" onClick={(e) => { e.preventDefault(); changeLanguage('fr'); }}>{t('header.languages.fr')}</a>
                  <a href="#" onClick={(e) => { e.preventDefault(); changeLanguage('zh'); }}>{t('header.languages.zh')}</a>
                </div>
              </a>
            </li>
          </ul>
        </nav>
      </header>

      <Routes>
  <Route path="/estimate" element={<EstimatePortal />} />
  <Route path="/photos" element={<PhotosGallery />} />
        <Route path="/" element={
          <>
            <div style={{
              width: '100vw',
              height: '100vh',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundImage: 'linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url(https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&q=80)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              color: '#FFFFFF',
              padding: '0 20px',
              marginTop: '-100px'
            }}>
              <div style={{
                maxWidth: '1200px',
                textAlign: 'center',
                animation: 'fadeIn 1.5s ease-out'
              }}>
                <h1 style={{
                  fontSize: '4.5rem',
                  fontWeight: 'bold',
                  marginBottom: '1rem',
                  color: '#FFFFFF',
                  textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
                }}>
                  Professional Cleaning Services
                </h1>
                <p style={{
                  fontSize: '1.5rem',
                  marginBottom: '2rem',
                  color: '#FFFFFF',
                  textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
                }}>
                  Experience the difference with our expert cleaning solutions
                </p>
                <button 
                  onClick={handleEstimateClick}
                  className="cta-button"
                >
                  Request Free Estimate
                </button>
              </div>
            </div>

            <section id="services" className="services">
              <h2>{t('services.title')}</h2>
              <p className="services-summary">{t('services.summary')}</p>
                  <div className="service-grid">
                  <div id="holiday" className="service-card">
                    <h3><i className="fas fa-candy-cane"></i> {t('services.items.holiday.title')}</h3>
                    <p>{t('services.items.holiday.description')}</p>
                  </div>
                  <div id="moveinout" className="service-card">
                    <h3><i className="fas fa-truck-moving"></i> {t('services.items.moveinout.title')}</h3>
                    <p>{t('services.items.moveinout.description')}</p>
                  </div>
                  <div id="premier" className="service-card">
                    <h3><i className="fas fa-crown"></i> {t('services.items.premier.title')}</h3>
                    <p>{t('services.items.premier.description')}</p>
                  </div>
                  <div id="apartment" className="service-card">
                    <h3><i className="fas fa-building"></i> {t('services.items.apartment.title')}</h3>
                    <p>{t('services.items.apartment.description')}</p>
                  </div>
                  <div id="office" className="service-card">
                    <h3><i className="fas fa-briefcase"></i> {t('services.items.office.title')}</h3>
                    <p>{t('services.items.office.description')}</p>
                  </div>
                  <div id="deep" className="service-card">
                    <h3><i className="fas fa-broom"></i> {t('services.items.deep.title')}</h3>
                    <p>{t('services.items.deep.description')}</p>
                  </div>
                  <div id="house" className="service-card">
                    <h3><i className="fas fa-home"></i> {t('services.items.house.title')}</h3>
                    <p>{t('services.items.house.description')}</p>
                  </div>
                  <div id="disinfection" className="service-card">
                    <h3><i className="fas fa-shield-virus"></i> {t('services.items.disinfection.title')}</h3>
                    <p>{t('services.items.disinfection.description')}</p>
                  </div>
                  <div id="organization" className="service-card">
                    <h3><i className="fas fa-boxes"></i> {t('services.items.organization.title')}</h3>
                    <p>{t('services.items.organization.description')}</p>
                  </div>
                  <div id="housekeeping" className="service-card">
                    <h3><i className="fas fa-hand-sparkles"></i> {t('services.items.housekeeping.title')}</h3>
                    <p>{t('services.items.housekeeping.description')}</p>
                  </div>
                  <div id="other" className="service-card">
                    <h3><i className="fas fa-plus-circle"></i> {t('services.items.other.title')}</h3>
                    <p>{t('services.items.other.description')}</p>
                  </div>
              </div>
            </section>

            <section id="about" className="about">
              <h2>{t('about.title')}</h2>
              <p>{t('about.description')}</p>
            </section>

            <section id="contact" className="contact">
              <h2>{t('contact.title')}</h2>
              <div className="contact-info">
                <p>{t('contact.info.email')}</p>
                <p>{t('contact.info.phone')}</p>
                <p>{t('contact.info.address')}</p>
              </div>
              <div className="contact-form">
                <ContactEmailForm />
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
              <img src={logo} alt="Ruby's Cleaning Service" />
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
            <h3>{t('footer.quickLinks.title')}</h3>
            <ul className="footer-links">
              <li><Link to="/">{t('header.nav.home')}</Link></li>
              <li><a href="#about">{t('header.nav.about')}</a></li>
              <li><a href="#services">{t('header.nav.services')}</a></li>
              <li><Link to="/photos">{t('header.nav.photos')}</Link></li>
              <li><a href="#contact">{t('header.nav.contact')}</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h3>Contact Us!</h3>
            <div className="footer-contact">
              <p><i className="fas fa-map-marker-alt"></i> 2300 Loreto Dr, Fort Worth, TX 76177</p>
              <p><i className="fas fa-envelope"></i> esmeralda@rubycleaningservice.com</p>
              <p><i className="fas fa-phone"></i> +1 469-993-5909</p>
              <p><i className="fas fa-phone"></i> +1 682-433-9500</p>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 Ruby's Cleaning Service. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default App

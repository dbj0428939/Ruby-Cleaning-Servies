import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { useTranslation } from './contexts/TranslationContext';
import './App.css';
import logo from './assets/logo.svg';
import EstimatePortal from './EstimatePortal';

function App() {
  const navigate = useNavigate();
  const { t, changeLanguage } = useTranslation();

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
            <a href={`tel:${t('header.contact.phone')}`}><i className="fas fa-phone"></i> {t('header.contact.phone')}</a>
            <a href={`mailto:${t('header.contact.email')}`}><i className="fas fa-envelope"></i> {t('header.contact.email')}</a>
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
            <li><Link to="/">{t('header.nav.home')}</Link></li>
            <li>
              <a href="#services">{t('header.nav.services')}</a>
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
                    href={`#${service.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      const serviceCard = document.querySelector(`.service-card h3 i.fas.fa-${{
                        holiday: 'candy-cane',
                        moveinout: 'truck-moving',
                        premier: 'crown',
                        apartment: 'building',
                        office: 'briefcase',
                        deep: 'broom',
                        house: 'home',
                        disinfection: 'shield-virus',
                        organization: 'boxes',
                        housekeeping: 'hand-sparkles'
                      }[service.id]}`).closest('.service-card');
                      if (serviceCard) {
                        serviceCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
                      }
                    }}
                  >
                    {service.name}
                  </a>
                ))}
              </div>
            </li>
            <li><a href="#about">{t('header.nav.about')}</a></li>
            <li><a href="#contact">{t('header.nav.contact')}</a></li>
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
        <Route path="/" element={
          <>
            <section id="home" className="hero">
              <div className="hero-content">
                <h1>{t('hero.title')}</h1>
                <p>{t('hero.subtitle')}</p>
                <button className="cta-button" onClick={handleEstimateClick}>{t('hero.cta')}</button>
              </div>
            </section>

            <section id="services" className="services">
              <h2>{t('services.title')}</h2>
              <p className="services-summary">{t('services.summary')}</p>
              <div className="service-grid">
                  <div className="service-card">
                    <h3><i className="fas fa-candy-cane"></i> {t('services.items.holiday.title')}</h3>
                    <p>{t('services.items.holiday.description')}</p>
                  </div>
                  <div className="service-card">
                    <h3><i className="fas fa-truck-moving"></i> {t('services.items.moveinout.title')}</h3>
                    <p>{t('services.items.moveinout.description')}</p>
                  </div>
                  <div className="service-card">
                    <h3><i className="fas fa-crown"></i> {t('services.items.premier.title')}</h3>
                    <p>{t('services.items.premier.description')}</p>
                  </div>
                  <div className="service-card">
                    <h3><i className="fas fa-building"></i> {t('services.items.apartment.title')}</h3>
                    <p>{t('services.items.apartment.description')}</p>
                  </div>
                  <div className="service-card">
                    <h3><i className="fas fa-briefcase"></i> {t('services.items.office.title')}</h3>
                    <p>{t('services.items.office.description')}</p>
                  </div>
                  <div className="service-card">
                    <h3><i className="fas fa-broom"></i> {t('services.items.deep.title')}</h3>
                    <p>{t('services.items.deep.description')}</p>
                  </div>
                  <div className="service-card">
                    <h3><i className="fas fa-home"></i> {t('services.items.house.title')}</h3>
                    <p>{t('services.items.house.description')}</p>
                  </div>
                  <div className="service-card">
                    <h3><i className="fas fa-shield-virus"></i> {t('services.items.disinfection.title')}</h3>
                    <p>{t('services.items.disinfection.description')}</p>
                  </div>
                  <div className="service-card">
                    <h3><i className="fas fa-boxes"></i> {t('services.items.organization.title')}</h3>
                    <p>{t('services.items.organization.description')}</p>
                  </div>
                  <div className="service-card">
                    <h3><i className="fas fa-hand-sparkles"></i> {t('services.items.housekeeping.title')}</h3>
                    <p>{t('services.items.housekeeping.description')}</p>
                  </div>
                  <div className="service-card">
                    <h3><i className="fas fa-plus-circle"></i> {t('services.items.other.title')}</h3>
                    <p>{t('services.items.other.description')}</p>
                    <input type="text" placeholder={t('services.items.other.placeholder')} className="other-service-input" />
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
                <h3>{t('contact.form.title')}</h3>
                <form>
                  <input type="text" placeholder={t('contact.form.fields.name')} required />
                  <input type="tel" placeholder={t('contact.form.fields.phone')} required />
                  <input type="email" placeholder={t('contact.form.fields.email')} required />
                  <textarea placeholder={t('contact.form.fields.message')} required></textarea>
                  <button type="submit" className="cta-button">{t('contact.form.submit')}</button>
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

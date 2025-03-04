import React, { useState } from 'react';
import { useTranslation } from './contexts/TranslationContext';
import './EstimatePortal.css';

function EstimatePortal() {
  const [formData, setFormData] = useState({
    services: [],
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    propertyType: '',
    squareFootage: '',
    bedrooms: '',
    bathrooms: '',
    preferredDate: '',
    preferredTime: '',
    frequency: '',
    specialInstructions: '',
    photos: []
  });

  const { t } = useTranslation();

  const services = [
    { id: 'holiday', icon: 'candy-cane', name: t('services.items.holiday.title'), description: t('services.items.holiday.description') },
    { id: 'moveinout', icon: 'truck-moving', name: t('services.items.moveinout.title'), description: t('services.items.moveinout.description') },
    { id: 'premier', icon: 'crown', name: t('services.items.premier.title'), description: t('services.items.premier.description') },
    { id: 'apartment', icon: 'building', name: t('services.items.apartment.title'), description: t('services.items.apartment.description') },
    { id: 'office', icon: 'briefcase', name: t('services.items.office.title'), description: t('services.items.office.description') },
    { id: 'deep', icon: 'broom', name: t('services.items.deep.title'), description: t('services.items.deep.description') },
    { id: 'house', icon: 'home', name: t('services.items.house.title'), description: t('services.items.house.description') },
    { id: 'disinfection', icon: 'shield-virus', name: t('services.items.disinfection.title'), description: t('services.items.disinfection.description') },
    { id: 'organization', icon: 'boxes', name: t('services.items.organization.title'), description: t('services.items.organization.description') },
    { id: 'housekeeping', icon: 'hand-sparkles', name: t('services.items.housekeeping.title'), description: t('services.items.housekeeping.description') }
  ];

  const handleServiceChange = (serviceId) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.includes(serviceId)
        ? prev.services.filter(id => id !== serviceId)
        : [...prev.services, serviceId]
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files);
    setFormData(prev => ({
      ...prev,
      photos: [...prev.photos, ...files]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the formData to your backend
    console.log('Form submitted:', formData);
    alert('Thank you for your request! We will contact you shortly.');
  };

  return (
    <div className="estimate-portal">
      <div className="portal-container">
        <h1>{t('estimate.title')}</h1>
        <p className="portal-description">{t('estimate.description')}</p>

        <form onSubmit={handleSubmit} className="estimate-form">
          <section className="form-section">
            <h2>{t('estimate.sections.services')}</h2>
            <div className="services-grid">
              {services.map(service => (
                <div key={service.id} className="service-card">
                  <div className="service-checkbox">
                    <input
                      type="checkbox"
                      id={service.id}
                      checked={formData.services.includes(service.id)}
                      onChange={() => handleServiceChange(service.id)}
                    />
                    <label htmlFor={service.id}>
                      <h3>
                        {service.id === 'holiday' && <i className="fas fa-candy-cane"></i>}
                        {service.id === 'moveinout' && <i className="fas fa-truck-moving"></i>}
                        {service.id === 'premier' && <i className="fas fa-crown"></i>}
                        {service.id === 'apartment' && <i className="fas fa-building"></i>}
                        {service.id === 'office' && <i className="fas fa-briefcase"></i>}
                        {service.id === 'deep' && <i className="fas fa-broom"></i>}
                        {service.id === 'house' && <i className="fas fa-home"></i>}
                        {service.id === 'disinfection' && <i className="fas fa-shield-virus"></i>}
                        {service.id === 'organization' && <i className="fas fa-boxes"></i>}
                        {service.id === 'housekeeping' && <i className="fas fa-hand-sparkles"></i>}
                        {service.name}
                      </h3>
                      <p className="service-description">{service.description}</p>
                    </label>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="form-section">
            <h2>{t('estimate.sections.contact')}</h2>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="firstName">{t('estimate.form.firstName')}</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="lastName">{t('estimate.form.lastName')}</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="email">{t('estimate.form.email')}</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="phone">{t('estimate.form.phone')}</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
          </section>

          <section className="form-section">
            <h2>{t('estimate.sections.property')}</h2>
            <div className="form-group">
              <label htmlFor="address">{t('estimate.form.address')}</label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="city">{t('estimate.form.city')}</label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="state">{t('estimate.form.state')}</label>
                <input
                  type="text"
                  id="state"
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="zipCode">{t('estimate.form.zipCode')}</label>
                <input
                  type="text"
                  id="zipCode"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="propertyType">{t('estimate.form.propertyType.label')}</label>
                <select
                  id="propertyType"
                  name="propertyType"
                  value={formData.propertyType}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">{t('estimate.form.propertyType.placeholder')}</option>
                  <option value="house">{t('estimate.form.propertyType.house')}</option>
                  <option value="apartment">{t('estimate.form.propertyType.apartment')}</option>
                  <option value="office">{t('estimate.form.propertyType.office')}</option>
                  <option value="other">{t('estimate.form.propertyType.other')}</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="squareFootage">{t('estimate.form.squareFootage.label')}</label>
                <input
                  type="number"
                  id="squareFootage"
                  name="squareFootage"
                  value={formData.squareFootage}
                  onChange={handleInputChange}
                  placeholder={t('estimate.form.squareFootage.placeholder')}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="bedrooms">{t('estimate.form.bedrooms.label')}</label>
                <select
                  id="bedrooms"
                  name="bedrooms"
                  value={formData.bedrooms}
                  onChange={handleInputChange}
                >
                  <option value="">{t('estimate.form.bedrooms.placeholder')}</option>
                  <option value="studio">{t('estimate.form.bedrooms.studio')}</option>
                  <option value="1">{t('estimate.form.bedrooms.options.1')}</option>
                  <option value="2">{t('estimate.form.bedrooms.options.2')}</option>
                  <option value="3">{t('estimate.form.bedrooms.options.3')}</option>
                  <option value="4">{t('estimate.form.bedrooms.options.4')}</option>
                  <option value="5+">{t('estimate.form.bedrooms.options.5+')}</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="bathrooms">{t('estimate.form.bathrooms.label')}</label>
                <select
                  id="bathrooms"
                  name="bathrooms"
                  value={formData.bathrooms}
                  onChange={handleInputChange}
                >
                  <option value="">{t('estimate.form.bathrooms.placeholder')}</option>
                  <option value="1">1</option>
                  <option value="1.5">1.5</option>
                  <option value="2">2</option>
                  <option value="2.5">2.5</option>
                  <option value="3">3</option>
                  <option value="3.5">3.5</option>
                  <option value="4+">4+</option>
                </select>
              </div>
            </div>
          </section>

          <section className="form-section">
            <h2>{t('estimate.sections.serviceDetails')}</h2>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="preferredDate">{t('estimate.form.preferredDate')}</label>
                <input
                  type="date"
                  id="preferredDate"
                  name="preferredDate"
                  value={formData.preferredDate}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="preferredTime">{t('estimate.form.preferredTime.label')}</label>
                <select
                  id="preferredTime"
                  name="preferredTime"
                  value={formData.preferredTime}
                  onChange={handleInputChange}
                >
                  <option value="">{t('estimate.form.preferredTime.placeholder')}</option>
                  <option value="morning">{t('estimate.form.preferredTime.morning')}</option>
                  <option value="afternoon">{t('estimate.form.preferredTime.afternoon')}</option>
                  <option value="evening">{t('estimate.form.preferredTime.evening')}</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="frequency">{t('estimate.form.frequency.label')}</label>
              <select
                id="frequency"
                name="frequency"
                value={formData.frequency}
                onChange={handleInputChange}
              >
                <option value="">{t('estimate.form.frequency.placeholder')}</option>
                <option value="one-time">{t('estimate.form.frequency.oneTime')}</option>
                <option value="weekly">{t('estimate.form.frequency.weekly')}</option>
                <option value="bi-weekly">{t('estimate.form.frequency.biWeekly')}</option>
                <option value="monthly">{t('estimate.form.frequency.monthly')}</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="specialInstructions">{t('estimate.form.specialInstructions.label')}</label>
              <textarea
                id="specialInstructions"
                name="specialInstructions"
                value={formData.specialInstructions}
                onChange={handleInputChange}
                placeholder={t('estimate.form.specialInstructions.placeholder')}
                rows="4"
              ></textarea>
            </div>

            <div className="form-group">
              <label htmlFor="photos">{t('estimate.form.photos.label')}</label>
              <div className="photo-upload">
                <input
                  type="file"
                  id="photos"
                  name="photos"
                  onChange={handlePhotoUpload}
                  multiple
                  accept="image/*"
                />
                <p className="upload-note">{t('estimate.form.photos.note')}</p>
              </div>
            </div>
          </section>

          <div className="form-actions">
            <button type="submit" className="submit-button">{t('estimate.form.submit')}</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EstimatePortal;
import React, { useState } from 'react';
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

  const services = [
    { id: 'holiday', name: 'Holiday Cleaning' },
    { id: 'moveinout', name: 'Move IN/Out Cleaning' },
    { id: 'premier', name: 'Premier Cleaning' },
    { id: 'apartment', name: 'Apartment Cleaning' },
    { id: 'office', name: 'Small Office Cleaning' },
    { id: 'deep', name: 'Deep Cleaning' },
    { id: 'house', name: 'House Cleaning' },
    { id: 'disinfection', name: 'Enhanced Disinfection' },
    { id: 'organization', name: 'Organization Service' },
    { id: 'housekeeping', name: 'Housekeeping' }
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
        <h1>Request a Free Estimate</h1>
        <p className="portal-description">
          Please fill out the form below to receive a detailed estimate for our cleaning services.
          The more information you provide, the more accurate our estimate will be.
        </p>

        <form onSubmit={handleSubmit} className="estimate-form">
          <section className="form-section">
            <h2>Select Services Needed</h2>
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
                    </label>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="form-section">
            <h2>Contact Information</h2>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="firstName">First Name*</label>
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
                <label htmlFor="lastName">Last Name*</label>
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
                <label htmlFor="email">Email*</label>
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
                <label htmlFor="phone">Phone Number*</label>
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
            <h2>Property Information</h2>
            <div className="form-group">
              <label htmlFor="address">Street Address*</label>
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
                <label htmlFor="city">City*</label>
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
                <label htmlFor="state">State*</label>
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
                <label htmlFor="zipCode">ZIP Code*</label>
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
                <label htmlFor="propertyType">Property Type*</label>
                <select
                  id="propertyType"
                  name="propertyType"
                  value={formData.propertyType}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Property Type</option>
                  <option value="house">House</option>
                  <option value="apartment">Apartment</option>
                  <option value="office">Office</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="squareFootage">Square Footage</label>
                <input
                  type="number"
                  id="squareFootage"
                  name="squareFootage"
                  value={formData.squareFootage}
                  onChange={handleInputChange}
                  placeholder="Approximate square feet"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="bedrooms">Number of Bedrooms</label>
                <select
                  id="bedrooms"
                  name="bedrooms"
                  value={formData.bedrooms}
                  onChange={handleInputChange}
                >
                  <option value="">Select</option>
                  <option value="studio">Studio</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5+">5+</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="bathrooms">Number of Bathrooms</label>
                <select
                  id="bathrooms"
                  name="bathrooms"
                  value={formData.bathrooms}
                  onChange={handleInputChange}
                >
                  <option value="">Select</option>
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
            <h2>Service Details</h2>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="preferredDate">Preferred Date</label>
                <input
                  type="date"
                  id="preferredDate"
                  name="preferredDate"
                  value={formData.preferredDate}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="preferredTime">Preferred Time</label>
                <select
                  id="preferredTime"
                  name="preferredTime"
                  value={formData.preferredTime}
                  onChange={handleInputChange}
                >
                  <option value="">Select Time</option>
                  <option value="morning">Morning (8AM - 12PM)</option>
                  <option value="afternoon">Afternoon (12PM - 4PM)</option>
                  <option value="evening">Evening (4PM - 8PM)</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="frequency">Service Frequency</label>
              <select
                id="frequency"
                name="frequency"
                value={formData.frequency}
                onChange={handleInputChange}
              >
                <option value="">Select Frequency</option>
                <option value="one-time">One-time Service</option>
                <option value="weekly">Weekly</option>
                <option value="bi-weekly">Bi-weekly</option>
                <option value="monthly">Monthly</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="specialInstructions">Special Instructions or Requirements</label>
              <textarea
                id="specialInstructions"
                name="specialInstructions"
                value={formData.specialInstructions}
                onChange={handleInputChange}
                placeholder="Please provide any additional information that will help us serve you better"
                rows="4"
              ></textarea>
            </div>

            <div className="form-group">
              <label htmlFor="photos">Upload Photos (Optional)</label>
              <div className="photo-upload">
                <input
                  type="file"
                  id="photos"
                  name="photos"
                  onChange={handlePhotoUpload}
                  multiple
                  accept="image/*"
                />
                <p className="upload-note">You can upload multiple photos of the space(s) to be cleaned</p>
              </div>
            </div>
          </section>

          <div className="form-actions">
            <button type="submit" className="submit-button">Submit Request</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EstimatePortal;
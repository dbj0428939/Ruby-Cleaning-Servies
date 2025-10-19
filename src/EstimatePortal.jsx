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
  preferredContactMethod: '',
    propertyType: '',
  // removed squareFootage/bedrooms/bathrooms per request
    preferredDate: '',
    preferredTime: '',
    frequency: '',
    specialInstructions: '',
    // photos removed per request
  });

  const { t } = useTranslation();




  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the formData to your backend
    console.log('Form submitted:', formData);
    alert('Thank you for your request! We will contact you shortly.');
  };

  // Email compose helpers
  const encodeBody = (data) => {
    const format12Hour = (time24) => {
      if (!time24) return '';
      // expect HH:MM
      const parts = time24.split(':');
      if (parts.length < 2) return time24;
      const h = parseInt(parts[0], 10);
      const m = parts[1];
      const suffix = h >= 12 ? 'PM' : 'AM';
      let hour = h % 12;
      if (hour === 0) hour = 12;
      return `${hour}:${String(m).padStart(2, '0')} ${suffix}`;
    };

    const formattedTime = format12Hour(data.preferredTime);

    const lines = [
      `${t('estimate.form.firstName')}: ${data.firstName}`,
      `${t('estimate.form.lastName')}: ${data.lastName}`,
      `${t('estimate.form.phone')}: ${data.phone}`,
      `${t('estimate.form.address')}: ${data.address}`,
      `${t('estimate.form.city')}: ${data.city}`,
      `${t('estimate.form.state')}: ${data.state}`,
      `${t('estimate.form.zipCode')}: ${data.zipCode}`,
      `${t('contact.form.fields.preferredContactMethod')}: ${t(`contact.form.fields.preferredContactOptions.${data.preferredContactMethod}`) || data.preferredContactMethod}`,
      `${t('estimate.form.propertyType.label')}: ${data.propertyType}`,
      `${t('estimate.form.preferredDate')}: ${data.preferredDate}`,
  `${t('estimate.form.preferredTime.label')}: ${formattedTime}`,
      `${t('estimate.form.frequency.label')}: ${data.frequency}`,
      `${t('estimate.form.specialInstructions.label')}:`,
      '',
      `${data.specialInstructions}`,
    ];
    return encodeURIComponent(lines.join('\n'));
  };

  const recipient = 'esmeralda@rubycleaningservice.com';
  const mailTo = () => {
    const prefix = t('email.subjectPrefix');
    const subject = encodeURIComponent(`${prefix} ${formData.firstName || ''} ${formData.lastName || ''}`);
    return `mailto:${recipient}?subject=${subject}&body=${encodeBody(formData)}`;
  };
  const gmailTo = () => {
    const prefix = t('email.subjectPrefix');
    const subject = encodeURIComponent(`${prefix} ${formData.firstName || ''} ${formData.lastName || ''}`);
    return `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(recipient)}&su=${subject}&body=${encodeBody(formData)}`;
  };
  const outlookTo = () => {
    const prefix = t('email.subjectPrefix');
    const subject = encodeURIComponent(`${prefix} ${formData.firstName || ''} ${formData.lastName || ''}`);
    return `https://outlook.office.com/mail/deeplink/compose?to=${encodeURIComponent(recipient)}&subject=${subject}&body=${encodeBody(formData)}`;
  };

  return (
    <div className="estimate-portal">
      <div className="portal-container">
        <h1>{t('estimate.title')}</h1>
        <p className="portal-description">{t('estimate.description')}</p>

        <form onSubmit={handleSubmit} className="estimate-form">
          {/* Select Services removed per request */}

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
              <div className="form-group">
                <label htmlFor="preferredContactMethod">{t('contact.form.fields.preferredContactMethod')}</label>
                <select
                  id="preferredContactMethod"
                  name="preferredContactMethod"
                  value={formData.preferredContactMethod}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">{t('contact.form.fields.preferredContactOptions.placeholder')}</option>
                  <option value="phone">{t('contact.form.fields.preferredContactOptions.phone')}</option>
                  <option value="text">{t('contact.form.fields.preferredContactOptions.text')}</option>
                  <option value="email">{t('contact.form.fields.preferredContactOptions.email')}</option>
                </select>
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
            </div>

            {/* Square footage / bedrooms / bathrooms removed per request */}
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
                <input
                  type="time"
                  id="preferredTime"
                  name="preferredTime"
                  value={formData.preferredTime}
                  onChange={handleInputChange}
                />
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
              <p className="field-note" style={{fontSize: '0.9rem', color: '#666', marginTop: '8px'}}>{t('estimate.form.specialInstructions.note')}</p>
            </div>

            {/* Upload photos removed per request */}
          </section>

          <div className="form-actions">
            <div style={{display: 'flex', gap: '12px'}}>
              <a className="cta-button" href={mailTo()}>
                Send with Mail
              </a>
              <a className="cta-button" href={gmailTo()} target="_blank" rel="noopener noreferrer">
                Send with Gmail
              </a>
              <a className="cta-button" href={outlookTo()} target="_blank" rel="noopener noreferrer">
                Send with Outlook
              </a>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EstimatePortal;
import React, { useState } from 'react';
import { useTranslation } from './contexts/TranslationContext';

function encodeBody(name, phone, address, localizedPreferredMethod, message) {
  return encodeURIComponent(
    `Name: ${name}\nPhone: ${phone}\nAddress: ${address}\nPreferred Contact Method: ${localizedPreferredMethod}\n\nMessage:\n${message}`
  );
}

export default function ContactEmailForm() {
  const { t } = useTranslation();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [preferredMethod, setPreferredMethod] = useState('');
  const [message, setMessage] = useState('');

  const mailToSend = (to) => {
    const subject = encodeURIComponent('Website Contact Request');
  const localizedPreferred = t(`contact.form.fields.preferredContactOptions.${preferredMethod}`) || preferredMethod;
  const body = encodeBody(name, phone, address, localizedPreferred, message);
    return `mailto:${to}?subject=${subject}&body=${body}`;
  };

  const gmailSend = (to) => {
    const subject = encodeURIComponent('Website Contact Request');
  const localizedPreferred = t(`contact.form.fields.preferredContactOptions.${preferredMethod}`) || preferredMethod;
  const body = encodeBody(name, phone, address, localizedPreferred, message);
    // Gmail compose URL
    return `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(to)}&su=${subject}&body=${body}`;
  };

  const outlookSend = (to) => {
    const subject = encodeURIComponent('Website Contact Request');
  const localizedPreferred = t(`contact.form.fields.preferredContactOptions.${preferredMethod}`) || preferredMethod;
  const body = encodeBody(name, phone, address, localizedPreferred, message);
    // Outlook web compose URL
    return `https://outlook.office.com/mail/deeplink/compose?to=${encodeURIComponent(to)}&subject=${subject}&body=${body}`;
  };

  const recipient = 'esmeralda@rubycleaningservice.com';

  return (
    <div className="contact-form-card">
      <h3>{t('contact.form.title')}</h3>
      <form onSubmit={(e) => e.preventDefault()}>
    <input type="text" placeholder={t('contact.form.fields.name')} value={name} onChange={(e) => setName(e.target.value)} required />
  <input type="tel" placeholder={t('contact.form.fields.phone')} value={phone} onChange={(e) => setPhone(e.target.value)} required />
  <input type="text" placeholder={t('contact.form.fields.address')} value={address} onChange={(e) => setAddress(e.target.value)} required />
    <label style={{display: 'block', marginTop: '8px'}} htmlFor="preferredMethod">{t('contact.form.fields.preferredContactMethod')}</label>
    <select id="preferredMethod" value={preferredMethod} onChange={(e) => setPreferredMethod(e.target.value)} required style={{width: '100%', padding: '8px', marginTop: '6px'}}>
      <option value="">{t('contact.form.fields.preferredContactOptions.placeholder')}</option>
      <option value="phone">{t('contact.form.fields.preferredContactOptions.phone')}</option>
      <option value="text">{t('contact.form.fields.preferredContactOptions.text')}</option>
      <option value="email">{t('contact.form.fields.preferredContactOptions.email')}</option>
    </select>
    <textarea placeholder={t('contact.form.fields.message')} value={message} onChange={(e) => setMessage(e.target.value)} required />

        <div className="send-buttons" style={{display: 'flex', gap: '12px', justifyContent: 'center', marginTop: '16px'}}>
          <a className="cta-button" href={mailToSend(recipient)} onClick={() => {}}>
            Send with Mail
          </a>
          <a className="cta-button" href={gmailSend(recipient)} target="_blank" rel="noopener noreferrer">
            Send with Gmail
          </a>
          <a className="cta-button" href={outlookSend(recipient)} target="_blank" rel="noopener noreferrer">
            Send with Outlook
          </a>
        </div>
      </form>
    </div>
  );
}

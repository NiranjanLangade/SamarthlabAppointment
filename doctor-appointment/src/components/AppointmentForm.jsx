import { useState } from 'react';
import axios from 'axios';
import './AppointmentForm.css';

const AppointmentForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [appointmentDate, setAppointmentDate] = useState('');
  const [gender, setGender] = useState('male');
  const [address, setAddress] = useState({
    street1: '',
    street2: '',
    city: '',
    region: '',
    postalCode: '',
    country: 'India', // Set default country to India
  });
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/appointments/book', {
        name,
        email,
        phone,
        appointmentDate,
        gender,
        address,
      });
      setMessage(response.data.message || 'Form submitted successfully');
      resetForm();
    } catch (error) {
      console.error(error);
      setMessage('Failed to submit the form. Please try again.');
    }
  };

  const resetForm = () => {
    setName('');
    setEmail('');
    setPhone('');
    setAppointmentDate('');
    setGender('male');
    setAddress({
      street1: '',
      street2: '',
      city: '',
      region: '',
      postalCode: '',
      country: 'India', // Reset country to default
    });
  };

  return (
    <section className="container">
      <header>Appointment Registration Form</header>
      <form onSubmit={handleSubmit} className="form">
        <div className="input-box">
          <label>
            Full Name <span className="required-asterisk">*</span>
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter full name"
            required
          />
        </div>

        <div className="input-box">
          <label>
            Email Address <span className="required-asterisk">*</span>
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email address"
            required
          />
        </div>

        <div className="column">
          <div className="input-box">
            <label>
              Phone Number <span className="required-asterisk">*</span>
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter phone number"
              required
            />
          </div>
          <div className="input-box">
            <label>
              Appointment Date <span className="required-asterisk">*</span>
            </label>
            <input
              type="date"
              value={appointmentDate}
              onChange={(e) => setAppointmentDate(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="gender-box">
          <h3>Gender <span className="required-asterisk">*</span></h3>
          <div className="gender-option">
            <div className="gender">
              <input
                type="radio"
                id="check-male"
                name="gender"
                value="male"
                checked={gender === 'male'}
                onChange={() => setGender('male')}
              />
              <label htmlFor="check-male">Male</label>
            </div>
            <div className="gender">
              <input
                type="radio"
                id="check-female"
                name="gender"
                value="female"
                checked={gender === 'female'}
                onChange={() => setGender('female')}
              />
              <label htmlFor="check-female">Female</label>
            </div>
            <div className="gender">
              <input
                type="radio"
                id="check-other"
                name="gender"
                value="other"
                checked={gender === 'other'}
                onChange={() => setGender('other')}
              />
              <label htmlFor="check-other">Prefer not to say</label>
            </div>
          </div>
        </div>

        <div className="input-box address">
          <label>Address</label>
          <input
            type="text"
            value={address.street1}
            onChange={(e) => setAddress({ ...address, street1: e.target.value })}
            placeholder="Street address (required)"
            required
          />
          <input
            type="text"
            value={address.street2}
            onChange={(e) => setAddress({ ...address, street2: e.target.value })}
            placeholder="Street address line 2 (optional)"
          />
          <div className="column">
            <div className="select-box">
              <select
                value={address.country}
                onChange={(e) => setAddress({ ...address, country: e.target.value })}
              >
                <option value="India">India</option>
                <option value="America">America</option>
                <option value="Japan">Japan</option>
                <option value="Nepal">Nepal</option>
              </select>
            </div>
            <input
              type="text"
              value={address.city}
              onChange={(e) => setAddress({ ...address, city: e.target.value })}
              placeholder="Enter your city"
              required
            />
          </div>
          <div className="column">
            <input
              type="text"
              value={address.region}
              onChange={(e) => setAddress({ ...address, region: e.target.value })}
              placeholder="Enter your region"
              required
            />
            <input
              type="text"
              value={address.postalCode}
              onChange={(e) => setAddress({ ...address, postalCode: e.target.value })}
              placeholder="Enter postal code"
              required
            />
          </div>
        </div>

        <button type="submit">Submit</button>

        {message && <div className="message">{message}</div>}
      </form>
    </section>
  );
};

export default AppointmentForm;

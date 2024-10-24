import React, { useState } from 'react';
import '../Styles/Register.css';
import { Link } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    country: '',
    state: '',
    city: '',
    society: '',
    password: '',
    confirmPassword: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showSocietyForm, setShowSocietyForm] = useState(false);
  const [societyFormData, setSocietyFormData] = useState({
    societyName: '',
    societyAddress: '',
    country: '',
    state: '',
    city: '',
    zipCode: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSocietyChange = (e) => {
    const { name, value } = e.target;
    setSocietyFormData({ ...societyFormData, [name]: value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Main Form Data:', formData);
    setShowSocietyForm(true); // Show the society form after main form submission
  };

  const handleSocietyFormSubmit = (e) => {
    e.preventDefault();
    console.log('Society Form Data:', societyFormData);
    // Reset form data and hide society form if needed
    setSocietyFormData({
      societyName: '',
      societyAddress: '',
      country: '',
      state: '',
      city: '',
      zipCode: '',
    });
    setShowSocietyForm(false);
  };

  return (
    <div className="register-container">
      <div className="image-part">
        <h2 style={{ color: "black", marginLeft: "-450px", fontSize: "3rem" }} className="image-title"><span style={{ color: "#FE512E" }}>Dash</span>Stack</h2> {/* Added title */}
        <img src="Register.png" alt="DashStack Illustration" />
      </div>

      <div className="form-part">
        <h2>Registration</h2>
        <form onSubmit={() => { }}>
          <div className="input-row">
            <div className="input-group">
              <label>First Name</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                placeholder="Enter First Name"
              />
            </div>
            <div className="input-group">
              <label>Last Name</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                placeholder="Enter Last Name"
              />
            </div>
          </div>

          <div className="input-row">
            <div className="input-group">
              <label>Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Enter Email Address"
              />
            </div>
            <div className="input-group">
              <label>Phone Number</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                placeholder="91+"
              />
            </div>
          </div>

          <div className="input-row">
            <div className="input-group">
              <label>Country</label>
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
                required
                placeholder="Enter Country"
              />
            </div>
            <div className="input-group">
              <label>State</label>
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
                required
                placeholder="Enter State"
              />
            </div>
            <div className="input-group">
              <label>City</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
                placeholder="Enter City"
              />
            </div>
          </div>

          <div className="input-group">
            <label>Select Society</label>
            <select onChange={(e) => {
              if (e.target.value === "addNew") {
                setShowSocietyForm(true);
              } else {
                // Handle other selections if needed
              }
            }}>
              <option value="">Select Society</option>
              <option value="society1">Society 1</option>
              <option value="society2">Society 2</option>
              <option value="addNew">Create a new societty</option>
            </select>

          </div>
          <div className="input-group">
            <label>Select Role</label>
            <select onChange={(e) => {
              if (e.target.value === "addNew") {
                setShowSocietyForm(true);
              } else {
                // Handle other selections if needed
              }
            }}>
              <option value="">Role</option>
              <option value="admin">Admin</option>
              <option value="resident">Resident</option>
              <option value="security">Security</option>
            </select>

          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Enter Password"
            />
            <span
              className="show-password-icon"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? '🙈' : '👁️'}
            </span>
          </div>

          <div className="input-group">
            <label>Confirm Password</label>
            <input
              type={showPassword ? 'text' : 'password'}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              placeholder="Confirm Password"
            />
          </div>

          <button type="submit">Register</button>

          <p>
            Already have an account? <Link to={'/login'}>Log in here</Link>
          </p>
        </form>

        {/* New Society Form */}
        {showSocietyForm && (
          <div className="society-form">
            <h2>Society Details</h2>
            <form onSubmit={handleSocietyFormSubmit}>
              <div className="input-row">
                <div className="input-group">
                  <label>Society Name</label>
                  <input
                    type="text"
                    name="societyName"
                    value={societyFormData.societyName}
                    onChange={handleSocietyChange}
                    required
                    placeholder="Enter Society Name"
                  />
                </div>
                <div className="input-group">
                  <label>Society Address</label>
                  <input
                    type="text"
                    name="societyAddress"
                    value={societyFormData.societyAddress}
                    onChange={handleSocietyChange}
                    required
                    placeholder="Enter Society Address"
                  />
                </div>
              </div>

              <div className="input-row">
                <div className="input-group">
                  <label>Country</label>
                  <input
                    type="text"
                    name="country"
                    value={societyFormData.country}
                    onChange={handleSocietyChange}
                    required
                    placeholder="Enter Country"
                  />
                </div>
                <div className="input-group">
                  <label>State</label>
                  <input
                    type="text"
                    name="state"
                    value={societyFormData.state}
                    onChange={handleSocietyChange}
                    required
                    placeholder="Enter State"
                  />
                </div>
                <div className="input-group">
                  <label>City</label>
                  <input
                    type="text"
                    name="city"
                    value={societyFormData.city}
                    onChange={handleSocietyChange}
                    required
                    placeholder="Enter City"
                  />
                </div>
              </div>

              <div className="input-group">
                <label>Zip Code</label>
                <input
                  type="text"
                  name="zipCode"
                  value={societyFormData.zipCode}
                  onChange={handleSocietyChange}
                  required
                  placeholder="Enter Zip Code"
                />
              </div>

              <div style={{ gap: "10px" }} className="button-group">
                <button style={{ backgroundColor: "#FE512E", color: "black" }} type="submit">Save</button>
                <button style={{ backgroundColor: "#F6F8FB", color: "black" }} type="button" onClick={() => setShowSocietyForm(false)}>Cancel</button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Register;

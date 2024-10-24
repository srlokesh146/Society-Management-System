
import React, { useState } from 'react';
import '../Styles/Login.css'; // Import the enhanced CSS
import { Link } from "react-router-dom";

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData); // Login logic here
    };

    return (
        <div className="login-container">
            {/* Left Side: Image Section */}
            <div style={{gap:"50px"}} className="image-part">
        <h3 style={{color:"black",marginLeft:"-250px",fontSize:"3rem",marginTop:"-100px"}} className="image-title"><span style={{color:"#FE512E"}}>Dash</span>Stack</h3> {/* Added title */}
        <img src="Login.png" alt="DashStack Illustration" />
      </div>

            {/* Right Side: Login Form */}
            <div className="form-section">
                <div className="form-content">
                    <h2>Login</h2>
                    <p>Please login to your account</p>
                    <form onSubmit={handleSubmit}>
                        <div className="input-group">
                            <input
                                
                                type="email"
                                name="email"
                                placeholder="Enter your email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="input-group">
                            <input
                                type="password"
                                name="password"
                                placeholder="Enter your password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="actions">
                            <button type="submit">Login</button>
                            <a style={{color:"#FE512E"}} href="#forgot-password" className="forgot-password">
                                Forgot Password?
                            </a>
                        </div>
                        <p className="signup-text">
                            Don’t have an account? <Link to={'/register'}>Sign Up</Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;

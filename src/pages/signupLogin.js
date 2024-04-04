import React, { useState } from 'react';
import '../SignupWritecontent.css'; // Import the CSS file
const SignupLoginPage = ({ handleSignup, handleLogin }) => {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isSignup, setIsSignup] = useState(true);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const errors = {};

    // Validate username
    if (isSignup && !name.trim()) {
      errors.name = 'Name is required';
    } else if (isSignup && !(/^[a-zA-Z]{1,29}$/.test(name.trim()))) {
      errors.name = 'Name should be in alphabet only';
    }

    // Validate phone number
    if (!phone.trim()) {
      errors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(phone.trim())) {
      errors.phone = 'Phone number must be 10 digits';
    }

    // Validate password
    if (!password.trim()) {
      errors.password = 'Password is required';
    } else if (!/^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&+])[a-zA-Z0-9!@#$%^&+]{8,15}$/.test(password.trim())) {
      errors.password = 'Password should be alphanumeric with special characters (length 8-15)';
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      if (isSignup) {
        handleSignup({ phone, password, name });
      } else {
        handleLogin({ phone, password }).then((x) => {
          if (x && !x?.apiStatus) {
            if (x.message.toLowerCase().includes("password")) {
              setErrors({ password: x.message });
            } else {
              setErrors({ phone: x.message });
            }
          }
        });
      }
    }
  };

  return (
    <div className="wrapper">
      <div className="title">{isSignup ? 'Sign Up' : 'Login'}</div>
      <form onSubmit={handleSubmit}>
        {isSignup && (
          <div className="field">
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
            <label>Name</label>
            {errors.name && <div className="error">{errors.name}</div>}
          </div>
        )}
        <div className="field">
          <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} required />
          <label>Phone</label>
          {errors.phone && <div className="error">{errors.phone}</div>}
        </div>
        <div className="field">
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <label>Password</label>
          {errors.password && <div className="error">{errors.password}</div>}
        </div>
        <button type="submit">{isSignup ? 'Sign Up' : 'Login'}</button>
      </form>
      <p className="signup-link" onClick={() => setIsSignup(!isSignup)}>
        {isSignup ? 'Already have an account? Login' : "Don't have an account? Sign Up"}
      </p>
    </div>
  );
};

export default SignupLoginPage;

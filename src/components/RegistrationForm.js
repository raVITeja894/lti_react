import React, { useState } from "react";
import "./RegistrationForm.css"; // Import CSS file for styling
const RegistrationForm = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const validateRegistrationForm = (e) => {
    e.preventDefault();

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    // Validate password format
    const passwordRegex =
      /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      setError(
        "Password must contain at least 8 characters with at least 1 uppercase letter, 1 digit, and 1 special character."
      );
      return;
    }

    // If all validations pass, submit the form
    // ... perform registration action here ...
    setError("");
    console.log("Registration successful!");
  };

  return (
    <div className="form-container">
      <h1>Registration Form</h1>
      <form className="form" onSubmit={validateRegistrationForm}>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          unique
        />
        <br />
        <label>Username:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <br />
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br />
        <input type="submit" value="Submit" />
      </form>
      {error && <p className="error-msg">{error}</p>}
    </div>
  );
};
export default RegistrationForm;

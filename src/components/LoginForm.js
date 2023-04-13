import React, { useState } from "react";
import "./LoginForm.css"; // Import CSS file for styling

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const validateLoginForm = (e) => {
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
    // ... perform login action here ...
    setError("");
    console.log("Login successful!");
  };

  return (
    <div className="form-container">
      <h1>Login Form</h1>
      <form className="form" onSubmit={validateLoginForm}>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
export default LoginForm;

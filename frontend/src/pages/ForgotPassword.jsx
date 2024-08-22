import { useState } from 'react';
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const res_data = await response.json();

      if (response.ok) {
        toast.success(res_data.message);
      } else {
        toast.error(
          res_data.extraDetails ? res_data.extraDetails : res_data.message
        );
        console.log("invalid credentials");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <h2>Forgot Password</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-field">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label htmlFor="email">Enter your email</label>
        </div>
        <button type="submit">Send confirmation link</button>
        <a onClick={() => navigate("/login")} style={{marginTop: "20px"}}>Sign In</a>
      </form>
    </div>
  );
};

export default ForgotPassword;

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/authContext";
import { toast } from "react-toastify";

const Register = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
  });

  const navigate = useNavigate();
  const { storeToken } = useAuth();

  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:5000/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      const res_data = await response.json();

      if (response.ok) {
        storeToken(res_data.token);
        setUser({ username: "", email: "", phone: "", password: "" });
        toast.success("Registration successful");
        navigate("/");
      } else {
        toast.error(
          res_data.extraDetails ? res_data.extraDetails : res_data.message
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit} method="POST">
        <div className="input-field">
          <input
            type="text"
            name="username"
            autoComplete="off"
            value={user.username}
            onChange={handleInput}
            required
          />
          <label htmlFor="username">username</label>
        </div>
        <div className="input-field">
          <input
            type="text"
            name="email"
            autoComplete="off"
            value={user.email}
            onChange={handleInput}
            required
          />
          <label htmlFor="email">email</label>
        </div>
        <div className="input-field">
          <input
            type="number"
            name="phone"
            autoComplete="off"
            value={user.phone}
            onChange={handleInput}
            required
          />
          <label>phone</label>
        </div>
        <div className="input-field">
          <input
            type="password"
            name="password"
            autoComplete="off"
            value={user.password}
            onChange={handleInput}
            required
          />
          <label>password</label>
        </div>
        <button type="submit">Sign Up</button>
      </form>
      <div className="Create-account">
        <p>Already have an account? </p>
        <button
          className="loginRegisterButton"
          onClick={() => navigate("/login")}
        >
          Sign In
        </button>
      </div>
      <button className="goToHome" onClick={() => navigate("/")}>
        Go to Home Page
      </button>
    </div>
  );
};

export default Register;

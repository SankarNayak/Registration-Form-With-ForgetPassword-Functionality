import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/authContext";
import { toast } from "react-toastify";

const URL = "http://localhost:5000/api/auth/login";

const Login = () => {
  const [user, setUser] = useState({
    email: "",
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
      const response = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      const res_data = await response.json();

      if (response.ok) {
        toast.success("login successfull");
        storeToken(res_data.token);

        setUser({ email: "", password: "" });
        navigate("/");
      } else {
        toast.error(
          res_data.extraDetails ? res_data.extraDetails : res_data.message
        );
        console.log("invalid credentials");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="container">
        <h2>Sign In</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-field">
            <input
              type="text"
              name="email"
              value={user.email}
              onChange={handleInput}
              required
            />
            <label htmlFor="email">email</label>
          </div>
          <div className="input-field">
            <input
              type="password"
              name="password"
              value={user.password}
              onChange={handleInput}
              required
            />
            <label htmlFor="password">password</label>
          </div>
          <div className="forgot">
            <label htmlFor="Save-login">
              <input type="checkbox" id="Save-login" />
              <p>Save login information</p>
            </label>
            <a onClick={() => navigate("/forgot-password")}>Forgot password?</a>
          </div>
          <button type="submit">Sign In</button>
        </form>
        <div className="Create-account">
          <p>Dont have an account? </p>
          <button
            className="loginRegisterButton"
            onClick={() => navigate("/register")}
          >
            Create account
          </button>
        </div>
        <button className="goToHome" onClick={() => navigate("/")}>
          Go to Home Page
        </button>
      </div>
    </>
  );
};

export default Login;

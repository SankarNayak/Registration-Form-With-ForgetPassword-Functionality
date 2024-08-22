import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { token } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/api/auth/reset-password/${token}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ newPassword }),
        }
      );

      const resData = await response.json();

      if (response.ok) {
        toast.success(resData.message);
        navigate("/login");
      } else {
        toast.error(
          resData.extraDetails ? resData.extraDetails : resData.message
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="container">
        <h2>Reset Password</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-field">
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            <label htmlFor="newPassword">Enter new password</label>
          </div>
          <div className="input-field">
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <label htmlFor="confirmPassword">Confirm new password</label>
          </div>
          <button type="submit">Reset Password</button>
        </form>
      </div>
    </>
  );
};

export default ResetPassword;

import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Register.css";

const Register = ({history}) => {
  const [name, setName] = useState("");
  const [nric, setNric] = useState("");
  const [confirmnric, setConfirmNric] = useState("");
  const [error, setError] = useState("");

  const registerHandler = async (event) => {
    event.preventDefault();

    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };

    if (nric !== confirmnric) {
        setNric("");
        setConfirmNric("");
      setTimeout(() => {
        setError("");
      }, 5000);
      return setError("Passwords do not match");
    }

    try {
      const { data } = await axios.post(
        "http://localhost:4001/api/auth/registerUser",
        {
          name,
          nric
        },
        config
      );

      console.log(data);

      history.push("/");
    } catch (error) {
      setError(error.response.data.error);
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

 return (
 <div className="register-screen">
<form onSubmit={registerHandler} className="register-screen__form">
        <h3 className="register-screen__title">Register For Vaccination</h3>
        {error && <span className="error-message">{error}</span>}
        <div className="form-group">
        <label htmlFor="email">Name:</label>
          <input
            type="text"
            required
            id="name"
            placeholder="Name"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="nric">NRIC:</label>
          <input
            type="text"
            required
            id="nric"
            autoComplete="true"
            placeholder="Enter NRIC"
            value={nric}
            onChange={(e) => setNric(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmnric">Confirm NRIC:</label>
          <input
            type="text"
            required
            id="confirmnric"
            autoComplete="true"
            placeholder="Confirm NRIC"
            value={confirmnric}
            onChange={(event) => setConfirmNric(event.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Register
        </button>
        <span className="register-screen__subtext">
          Already have an registered for vacination? <Link to="/login">Login</Link>
        </span>
      </form>
 </div>
 );
}

export default Register;
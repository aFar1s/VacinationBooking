import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Login.css";

const Login = ({ history }) => {
  const [name, setName] = useState("");
  const [nric, setNric] = useState("");
  const [error, setError] = useState("");


  useEffect(() => {
    if (sessionStorage.getItem("authToken")) {
      history.push("/");
      console.log(history)
    }
  }, [history]);
  
  const loginHandler = async (event) => {
    event.preventDefault();
    
    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };
    
    try {
      const { data } = await axios.post(
        "http://localhost:4001/api/auth/login",
        { name, nric },
        config
        );
        // console.log(data)
        sessionStorage.setItem("authToken", data.token);
        sessionStorage.setItem("userID", data.user);

      history.push("/");
    } catch (error) {
      setError(error.response.data.error);
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  return (
    <div className="login-screen">
      <form onSubmit={loginHandler} className="login-screen__form">
        <h3 className="login-screen__title">Login</h3>
        {error && <span className="error-message">{error}</span>}
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            required
            id="name"
            placeholder="Enter Name"
            onChange={(event) => setName(event.target.value)}
            value={name}
            tabIndex={1}
          />
        </div>
        <div className="form-group">
          <label htmlFor="nric">
            NRIC:{" "}
          </label>
          <input
            type="text"
            required
            id="nric"
            autoComplete="true"
            placeholder="Enter NRIC"
            onChange={(event) => setNric(event.target.value)}
            value={nric}
            tabIndex={2}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Login
        </button>

        <span className="login-screen__subtext">
          Have not register for vaccination? <Link to="/register">Register</Link>
        </span>
      </form>
    </div>
  );
};

export default Login;
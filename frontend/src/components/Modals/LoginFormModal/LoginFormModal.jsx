import { useState } from "react";
import * as sessionActions from "../../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const disableBtn = credential.length < 4 || password.length < 6;

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    return dispatch(sessionActions.login({ credential, password }))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
        }
      });
  };

  return (
    <>
      <div className="header">
        <h1>Log In</h1>
        <button className="close-btn" onClick={closeModal}>
          x
        </button>
      </div>
      <form onSubmit={handleSubmit}>
        <label style={{ fontWeight: "bold" }}>Welcome to Mockbnb</label>
        <div className="container">
          <input
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
            placeholder="Username or Email"
          />
          <input
            type="password"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {errors.credential && <p>{errors.credential}</p>}
          <button className="login-btn" disabled={disableBtn} type="submit">
            Log In
          </button>
          <button
            className="demo-btn"
            onClick={() => {
              setCredential("Demo-lition");
              setPassword("password");
            }}
            type="submit"
          >
            Demo User
          </button>
        </div>
      </form>
    </>
  );
}

export default LoginFormModal;

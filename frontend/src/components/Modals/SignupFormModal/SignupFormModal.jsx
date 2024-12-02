import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../../context/Modal";
import * as sessionActions from "../../../store/session";
import "./SignupForm.css";

function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();
  const [touched, setTouched] = useState({
    email: false,
    username: false,
    firstName: false,
    lastName: false,
    password: false,
    confirmPassword: false,
  });

  useEffect(() => {
    const errors = {};
    if (!email) errors.email = "Email is required";
    if (username.length < 4)
      errors.username = "Username must be 4 or more characters";
    if (!firstName) errors.firstName = "First Name is required";
    if (!lastName) errors.lastName = "Last Name is required";
    if (password.length < 6) errors.password = "Password must be 6 more longer";
    if (password != confirmPassword)
      errors.confirmPassword =
        "Your password does not match up please try again";
    setErrors(errors);
  }, [email, username, firstName, lastName, password, confirmPassword]);

  const handleMessages = (message) => {
    setTouched((preState) => ({ ...preState, [message]: true }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors({});
      return dispatch(
        sessionActions.signup({
          email,
          username,
          firstName,
          lastName,
          password,
        })
      )
        .then(closeModal)
        .catch(async (res) => {
          const data = await res.json();
          if (data?.errors) {
            setErrors(data.errors);
          }
        });
    }
    return setErrors({
      confirmPassword:
        "Confirm Password field must be the same as the Password field",
    });
  };

  const isSubmitDisabled = Object.keys(errors).length > 0;

  return (
    <>
      <div className="header">
        <h1>Sign Up</h1>
        <button className="close-btn" onClick={closeModal}>
          x
        </button>
      </div>
      <label style={{ fontWeight: "bold" }}>Welcome to Mockbnb</label>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={() => handleMessages("email")}
            required
            placeholder="Email"
          />
          {touched.email && errors.email && <p>{errors.email}</p>}
          <input
            type="text"
            value={username}
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
            onBlur={() => handleMessages("username")}
            required
          />
          {touched.username && errors.username && <p>{errors.username}</p>}

          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            onBlur={() => handleMessages("firstName")}
            required
            placeholder="First Name"
          />
          {touched.firstName && errors.firstName && <p>{errors.firstName}</p>}
          <input
            type="text"
            value={lastName}
            placeholder="Last Name"
            onChange={(e) => setLastName(e.target.value)}
            required
          />
          {touched.lastName && errors.lastName && <p>{errors.lastName}</p>}
          <input
            type="password"
            value={password}
            placeholder="Password"
            onBlur={() => handleMessages("password")}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {touched.password && errors.password && <p>{errors.password}</p>}

          <input
            type="password"
            value={confirmPassword}
            placeholder="Confirm Password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
          <button disabled={isSubmitDisabled} type="submit">
            Sign Up
          </button>
        </form>
      </div>
    </>
  );
}

export default SignupFormModal;

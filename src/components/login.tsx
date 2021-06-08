import { TextField } from "@material-ui/core";
import { useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { userLogin } from "../services/userServices";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [validator, setValidator] = useState(false);

  const [alert, setAlert] = useState({ type: "", message: "" });

  const validation = () => {
    return [email, password].every((field: any) => {
      if (field === "") {
        return false;
      }
      return true;
    });
  };

  const dispatch = useDispatch();
  const store = useSelector((store:any)=>console.log(store))
  const handleLogin = (e: any) => {
    e.preventDefault();
    if (!validation()) {
      setValidator(true);
    } else {
      userLogin(dispatch, { email: email, password: password })
        .then((res) => {
          setAlert({
            type: "success",
            message: `Logged in as ${email}..!!`,
          });
          setEmail("");
          setPassword("");
        })
        .catch((err) => {
          if (err.response.status === 404) {
            console.log(err.response.status);
            setAlert({ type: "danger", message: "User not found" });
          } else if (err.response.status === 401) {
            setAlert({ type: "danger", message: "Wrong Password" });
          } else {
            setAlert({ type: "warning", message: err.message });
          }
        });
    }
  };

  return (
    <div>
      {alert.type !== "" ? (
        <div
          className={
            "alert " + "alert-" + alert.type + " alert-dismissible fade show"
          }
          role="alert"
        >
          <strong>
            {alert.type === "success" ? "Success..!!" : "Warning..!!"}
          </strong>{" "}
          {alert.message}
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
          ></button>
        </div>
      ) : (
        <div />
      )}
      <div className="form">
        <form>
          <div className="form-outline mb-4">
            <TextField
              className="textfield"
              label="Email or phone"
              value={email}
              error={validator && email === ""}
              helperText={validator && email === "" ? "Required" : ""}
              onChange={(e: any) => {
                setEmail(e.target.value);
              }}
            />
          </div>

          <div className="form-outline mb-4">
            <TextField
              className="textfield"
              type="password"
              label="Password"
              value={password}
              helperText={validator && password === "" ? "Required" : ""}
              error={validator && password === ""}
              onChange={(e: any) => {
                setPassword(e.target.value);
              }}
            />
          </div>

          <div className="row mb-4">
            <div className="col d-flex justify-content-center">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="form2Example3"
                />
                <label className="form-check-label" htmlFor="form2Example3">
                  Remember me
                </label>
              </div>
            </div>

            <div className="col">
              <a href="#!">Forgot password?</a>
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-block mb-4 submit-btn"
            onClick={(e) => handleLogin(e)}
          >
            Sign in
          </button>

          <div className="text-center">
            <p>
              Not a member? <Link to="/signup">Register</Link>
            </p>
            <p>or sign up with:</p>
            <button type="button" className="btn btn-primary btn-floating mx-1">
              <i className="fab fa-facebook-f"></i>
            </button>

            <button type="button" className="btn btn-primary btn-floating mx-1">
              <i className="fab fa-google"></i>
            </button>

            <button type="button" className="btn btn-primary btn-floating mx-1">
              <i className="fab fa-twitter"></i>
            </button>

            <button type="button" className="btn btn-primary btn-floating mx-1">
              <i className="fab fa-github"></i>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Login;

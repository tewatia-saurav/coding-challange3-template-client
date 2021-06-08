import { TextField } from "@material-ui/core";
import { useState } from "react";
import {Link} from 'react-router-dom'
import { userSignup } from "../services/userServices";
// import { userSignup } from "../requests/requests";

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [privilege, setPrivilege] = useState("user");

  const [alert, setAlert] = useState({ type: "", message: "" });

  const [validator, setValidator] = useState(false);

  const validate = () => {
    return [firstName, lastName, password, email, privilege].every(
      (field: string) => {
        if (field === "") {
          return false;
        }
        return true;
      }
    );
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (!validate()) {
      setValidator(true);
    } else {
      let user = {
        name: {
          firstName: firstName,
          lastName: lastName,
        },
        email: email,
        password: password,
        privilege: privilege,
      };
      userSignup(user)
        .then((res: any) => {
          setAlert({ type: "success", message: "Registered Successfully" });
        })
        .catch((err:any) => {
          if (err.response.status === 409) {
            setAlert({ type: "warning", message: "Email already exists" });
          } else {
            setAlert({ type: "danger", message: err.message });
          }
        });
    }
  };

  return (
    <div>
      {alert.type !== "" ? (
        <div
          className={"alert ".concat(
            "alert-",
            alert.type,
            " alert-dismissible fade show"
          )}
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
          <div className="row mb-4">
            <div className="col">
              <div className="form-outline">
                <TextField
                  className="textfield"
                  label="First Name"
                  error={validator && firstName === ""}
                  helperText={validator && firstName === "" ? "Required" : ""}
                  onChange={(e: any) => setFirstName(e.target.value)}
                />
              </div>
            </div>
            <div className="col">
              <div className="form-outline">
                <TextField
                  className="textfield"
                  label="Last Name"
                  error={validator && lastName === ""}
                  helperText={validator && lastName === "" ? "Required" : ""}
                  onChange={(e: any) => setLastName(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="form-outline mb-4">
            <TextField
              className="textfield"
              label="Email or Phone"
              error={validator && email === ""}
              helperText={validator && email === "" ? "Required" : ""}
              onChange={(e: any) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <div className="form-outline mb-4">
              <TextField
                className="textfield"
                type="password"
                label="Set Password"
                error={validator && password === ""}
                helperText={validator && password === "" ? "Required" : ""}
                onChange={(e: any) => setPassword(e.target.value)}
              />
            </div>

           
             

            <button
              type="submit"
              className="btn btn-primary btn-block mb-4 submit-btn"
              onClick={handleSubmit}
            >
              Sign up
            </button>
          </div>

          <div className="text-center">
            <p>
              Already Registered? <Link to="/login">Login</Link>
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

            <button
              type="button"
              className="btn btn-primary btn-floating mx-1 "
            >
              <i className="fab fa-github"></i>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;

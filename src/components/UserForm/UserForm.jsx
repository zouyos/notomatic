import { ValidatorService } from "services/form-validators";
import style from "./style.module.css";
import { useEffect, useState } from "react";
import { FieldError } from "components/FieldError/FieldError";
import { EnvelopeAt, ShieldLock } from "react-bootstrap-icons";

export function UserForm({ signup, onSubmit, serverErrors }) {
  const VALIDATORS = {
    email: (value) => {
      return (
        ValidatorService.min(value, 3) || ValidatorService.emailRegex(value)
      );
    },
    password: (value) => {
      return (
        ValidatorService.min(value, 6) ||
        ValidatorService.max(value, 30) ||
        ValidatorService.passwordRegex(value) ||
        (signup && ValidatorService.notSame(value, formValues.repeatPassword))
      );
    },
    repeatPassword: (value) => {
      return signup && ValidatorService.notSame(value, formValues.password);
    },
  };

  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
    repeatPassword: signup && "",
  });

  const [formErrors, setFormErrors] = useState({
    email: "",
    password: "",
    repeatPassword: signup && "",
  });

  function validate(fieldName, fieldValue) {
    setFormErrors({
      ...formErrors,
      [fieldName]: VALIDATORS[fieldName](fieldValue),
    });
  }

  function updateFormValues(e) {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
    validate(e.target.name, e.target.value);
  }

  function hasErrors() {
    return Object.values(formErrors).some((err) => err !== undefined);
  }

  useEffect(() => {
    validate("password", formValues.password);
  }, [formValues.repeatPassword]);

  useEffect(() => {
    validate("repeatPassword", formValues.repeatPassword);
  }, [formValues.password]);

  return (
    <div className="row justify-content-center">
      <div className="col-md-6 col-sm-12">
        <h2>{signup ? "Sign Up" : "Log In"}</h2>
        <form
          className={`form-control my-4 border border-primary ${style.form}`}
        >
          <div className="mb-3">
            <EnvelopeAt size={20} color="#b8b8b8" className="mb-1 me-2" />
            <label htmlFor="email" className="my-2">
              Email
            </label>
            <input
              type="text"
              name="email"
              value={formValues.email}
              onChange={updateFormValues}
              className="form-control"
            />
            <FieldError msg={formErrors.email} />
          </div>
          <div className="mb-3">
            <ShieldLock size={20} color="#b8b8b8" className="mb-1 me-2" />
            <label htmlFor="password" className="my-2">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formValues.password}
              onChange={updateFormValues}
              className="form-control"
            />
            <FieldError msg={formErrors.password} />
          </div>
          {signup && (
            <div className="mb-3">
              <ShieldLock size={20} color="#b8b8b8" className="mb-1 me-2" />
              <label htmlFor="repeatPassword" className="my-2">
                Repeat Password
              </label>
              <input
                type="password"
                name="repeatPassword"
                className="form-control"
                value={formValues.repeatPassword}
                onChange={updateFormValues}
              />
              <FieldError msg={formErrors.repeatPassword} />
            </div>
          )}
          <button
            className={`btn btn-primary mt-3 mb-2 rounded-pill ${style.button}`}
            onClick={(e) => {
              e.preventDefault();
              onSubmit(formValues);
            }}
            disabled={hasErrors()}
          >
            Submit
          </button>
        </form>
        {serverErrors.message ? (
          <FieldError msg={serverErrors.message} />
        ) : (
          <ul>
            {serverErrors.errors?.map((err, i) => (
              <li key={i}>
                <FieldError msg={err.msg} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

import React from "react";
import "./Modal.css";

export const LoginModal = ({
  show,
  handleClose,
  handleLogin,
  handleInputChange
}) => {
  return (
    <div
      className={`${show ? "modal display-block" : "modal display-none"} modal`}
    >
      <form>
        <div className="modal-content">
          <button
            onClick={handleClose}
            className="modal-close right green-text"
          >
            <i className="material-icons small">X</i>
          </button>
          <h4 className="center">Please Sign In</h4>
          <div className="modal-content">
            <input
              data-length="120"
              name="username"
              onChange={handleInputChange}
            />
            <label className="modal-label" htmlFor="input_text">
              Email
            </label>
          </div>
          <div className="modal-content">
            <input
              data-length="120"
              name="password"
              type="password"
              onChange={handleInputChange}
            />
            <label className="modal-label" htmlFor="input_text">
              Password
            </label>
          </div>
          <div className="modal-footer">
            <button
              className="button-login waves-effect orange darken-3 btn"
              onClick={handleLogin}
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

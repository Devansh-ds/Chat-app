import { Button } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { currentUser, login } from "../../Redux/Auth/Action";

const Signin = () => {
  const [inputData, setInputData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const auth = useSelector((store) => store.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(inputData));

    handleSnackbarClick();
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    if (token) {
      dispatch(currentUser(token));
    }
  }, [token]);

  useEffect(() => {
    if (auth.reqUser?.fullname) {
      navigate("/");
    }
  }, [auth.reqUser]);

  // snackbar start
  const [open, setOpen] = React.useState(false);

  const handleSnackbarClick = () => {
    setOpen(true);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  // snackbar end

  return (
    <div>
      <div className="flex justify-center h-screen items-center">
        <div className="w-[30%] xl:w-[30%] sm:w-[50%] p-10 shadow-md bg-white">
          <form onSubmit={(e) => handleSubmit(e)} className="space-y-5">
            <div>
              <p className="mb-2">Email</p>
              <input
                type="email"
                className="p-2 outline-green-600 w-full rounded-md border"
                placeholder="Enter your email"
                onChange={(e) => handleChange(e)}
                value={inputData.email}
                name="email"
              />
            </div>

            <div>
              <p className="mb-2">Password</p>
              <input
                type="password"
                className="p-2 outline-green-600 w-full rounded-md border"
                placeholder="Enter your password"
                onChange={(e) => handleChange(e)}
                value={inputData.password}
                name="password"
              />
            </div>

            <div>
              <Button
                color="success"
                className="w-full"
                variant="contained"
                type="submit"
              >
                Sign in
              </Button>
            </div>
          </form>

          <div className="flex space-x-3 items-center mt-5">
            <p className="m-0 mb-1">Create new Account?</p>
            <Button
              variant="text"
              className=""
              onClick={() => navigate("/signup")}
            >
              Sign Up
            </Button>
          </div>
        </div>
      </div>

      {/* snackbar (popup) */}
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Login successfull!!
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Signin;

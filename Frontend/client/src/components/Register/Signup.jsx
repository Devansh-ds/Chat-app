import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import { Button } from "@mui/material";
import Alert from "@mui/material/Alert";
import { useDispatch, useSelector } from "react-redux";
import { currentUser, register } from "../../Redux/Auth/Action";

const Signup = () => {
  const [inputData, setInputData] = useState({
    email: "",
    password: "",
    fullname: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector((store) => store.auth);
  const token = localStorage.getItem("token") || "";

  // form request handle start
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("handle submit data: ", inputData);
    dispatch(register(inputData));
    handleSnackbarClick();
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputData((prev) => ({ ...prev, [name]: value }));
  };
  // form request handle close

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

  useEffect(() => {
    if (token) {
      console.log("dispatching current user api with token: ", token)
      dispatch(currentUser(token));
    }
  }, [token]);

  useEffect(() => {
    if (auth.reqUser?.fullname) {
      navigate("/");
    }
  }, [auth.reqUser]);

  return (
    <div>
      <div className="flex flex-col justify-center min-h-screen items-center">
        <div className="w-[30%] xl:w-[30%] sm:w-[50%] p-10 shadow-md bg-white">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <p className="mb-2">Username</p>
              <input
                type="text"
                className="py-2 px-3 outline-green-600 w-full rounded-md border"
                placeholder="Enter your name"
                name="fullname"
                onChange={(e) => handleChange(e)}
                value={inputData.fullname}
              />
            </div>
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
                Sign up
              </Button>
            </div>
          </form>
          <div className="flex space-x-3 items-center mt-5">
            <p>Already have an account?</p>
            <p
              onClick={() => navigate("/login")}
              className="text-blue-500 hover:text-blue-800 cursor-pointer"
            >
              Login
            </p>
          </div>
        </div>
        <div>
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
              Account created!!
            </Alert>
          </Snackbar>
        </div>
      </div>
    </div>
  );
};

export default Signup;

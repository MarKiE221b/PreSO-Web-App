import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Stack,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
} from "@mui/material";
import preSoLogo from "../../assets/preSo_logo.png";
import chedLogo from "../../assets/CHED-LOGO_orig (1).png";

import { MdVisibility } from "react-icons/md";
import { MdVisibilityOff } from "react-icons/md";

const LoginPage = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Logging in with:", form);
  };

  return (
    <>
      <div
        className="flex flex-1 items-center h-screen"
        style={{ backgroundColor: `rgb(3, 79, 139)` }}
      >
        <div className="border border-solid rounded-md shadow-md container bg-white scale-75 sm:scale-100">
          <div className="flex flex-col md:flex-row">
            <div className="w-full p-6">
              <form onSubmit={handleLogin}>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: "bold",
                    marginBottom: 3,
                    textAlign: "start",
                    color: "#374151", // Responsive font size
                  }}
                >
                  User Login
                </Typography>
                <TextField
                  fullWidth
                  value={form.email}
                  label="Email"
                  type="email"
                  variant="outlined"
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, email: e.target.value }))
                  }
                  required
                  sx={{
                    marginBottom: 3,
                  }}
                />
                <FormControl
                  sx={{ width: "100%", marginBottom: 3 }}
                  variant="outlined"
                >
                  <InputLabel htmlFor="outlined-adornment-password">
                    Password *
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-password"
                    value={form.password}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, password: e.target.value }))
                    }
                    type={showPassword ? "text" : "password"}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label={
                            showPassword
                              ? "hide the password"
                              : "display the password"
                          }
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          onMouseUp={handleMouseUpPassword}
                          edge="end"
                        >
                          {showPassword ? (
                            <MdVisibilityOff />
                          ) : (
                            <MdVisibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Password"
                  />
                </FormControl>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                >
                  Login
                </Button>
              </form>
            </div>

            <div
              className="w-full p-6"
              style={{ backgroundColor: `rgb(235,235,235)` }}
            >
              <Stack gap={2}>
                <div className="flex flex-col items-center gap-1">
                  <img className="h-[100px] w-[100px]" src={chedLogo} />
                  <p className="font-times text-lg text-nowrap">
                    COMMISSION ON HIGHER EDUCATION
                  </p>
                </div>

                <div className="flex flex-col items-center gap-1">
                  <img className="h-[250px] w-[250px]" src={preSoLogo} />
                  <Typography variant="body1">
                    ONLINE SO PRE-SUBMISSION
                  </Typography>
                </div>
              </Stack>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;

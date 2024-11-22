"use client";
import { useState } from "react";
import * as React from "react";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import Link from "next/link";

type FormDetails = {
  username: string;
  password: string;
};

export default function Login() {
  const jwtToken = Cookies.get("token");
  const router = useRouter();
  const [formDetails, setFormDetails] = useState<FormDetails>({
    username: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const onEnterInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const url = "http://localhost:3000/api/login";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formDetails),
    };
    const response = await fetch(url, options);
    if (response.ok === false) return alert("Invalid Credentials");
    const data = await response.json();
    Cookies.set("token", data.token);
    router.replace("/");
  };

  if (jwtToken !== undefined) {
    return router.replace("/");
  }
  return (
    <div className="flex items-center justify-center h-screen w-screen">
      <form
        className="border-2 border-black p-6 rounded w-80"
        onSubmit={handleSubmit}
      >
        <h1 className="text-center mb-4">Login</h1>
        <TextField
          id="username"
          label="Enter Username"
          variant="outlined"
          fullWidth
          size="small"
          name="username"
          value={formDetails.username}
          onChange={onEnterInput}
          margin="normal"
        />
        <TextField
          id="password"
          label="Enter Password"
          variant="outlined"
          fullWidth
          size="small"
          name="password"
          type={showPassword ? "text" : "password"}
          value={formDetails.password}
          onChange={onEnterInput}
          margin="normal"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={showPassword}
              onChange={() => setShowPassword((prev) => !prev)}
              aria-label="Show password"
            />
          }
          label="Show Password"
          labelPlacement="end"
        />
        <Link href="/register">
          <p className="text-blue-600">Dont Have an Account Register Here</p>
        </Link>
        <div className="flex justify-center mt-4">
          <Button
            variant="contained"
            type="submit"
            className="w-full"
            style={{ textTransform: "none" }}
          >
            Login
          </Button>
        </div>
      </form>
    </div>
  );
}

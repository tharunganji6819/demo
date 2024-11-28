"use client";
import { useState } from "react";
import Link from "next/link";
import * as React from "react";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

type FormDetails = {
  username: string;
  password: string;
  email: string;
};

export default function Register() {
  const [formDetails, setFormDetails] = useState<FormDetails>({
    email: "",
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
    const url = "http://localhost:3000/api/register";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formDetails),
    };
    const response = await fetch(url, options);
    const data = await response.json();
    console.log(data);
  };

  return (
    <div className="flex items-center justify-center h-screen w-screen">
      <form
        className="border-2 border-black p-2 rounded w-80"
        onSubmit={handleSubmit}
      >
        <h1 className="text-center">Register</h1>
        <TextField
          size="small"
          id="email"
          label="Enter Email"
          variant="outlined"
          className="w-full"
          name="email"
          value={formDetails.email}
          onChange={onEnterInput}
          margin="normal"
        />
        <TextField
          id="username"
          size="small"
          label="Enter Username"
          variant="outlined"
          className="w-full"
          name="username"
          value={formDetails.username}
          onChange={onEnterInput}
          margin="normal"
        />
        <TextField
          id="password"
          size="small"
          label="Enter Password"
          variant="outlined"
          className="w-full"
          name="password"
          type={showPassword ? "text" : "password"}
          value={formDetails.password}
          onChange={onEnterInput}
          margin="normal"
        />
        <div className="flex items-center">
          <Checkbox
            {...label}
            checked={showPassword}
            onChange={() => setShowPassword((prev) => !prev)}
          />
          <p className="-ml-1">Show Password</p>
        </div>
        <Link href="/login">
          <p className="mb-2 text-blue-600">Existing User Login Here</p>
        </Link>
        <div className="flex justify-center">
          <Button
            variant="contained"
            type="submit"
            className="w-full"
            style={{ textTransform: "none" }}
          >
            Register
          </Button>
        </div>
      </form>
    </div>
  );
}

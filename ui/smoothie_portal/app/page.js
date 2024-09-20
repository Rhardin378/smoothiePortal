"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useSelector } from "react-redux";

import { signin } from "./store/slices/authSlice.js";

export default function Home() {
  const errorMessage = useSelector((state) => state.auth.errorMessage);
  console.log(errorMessage);

  const authenticated = useSelector((state) => state.auth.authenticated);
  console.log(authenticated);
  const userSchema = Yup.object().shape({
    email: Yup.string().email().required(),
    password: Yup.string().required(),
  });

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userSchema),
  });

  const validateSignIn = (signInAttempt) => {
    if (signInAttempt.payload && signInAttempt.payload.email) {
      router.push("/manager/dashboard");
    }
  };
  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    try {
      const result = await dispatch(signin(data));
      console.log(result.payload);

      validateSignIn(result);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-2xl w-full bg-white shadow-md rounded-lg p-12 bg-yellow-400">
        {/* Logo at the top */}
        <div className="flex justify-center mb-6">
          <img src="./default.png" alt="Logo" className="h-48 w-48" />
        </div>

        <h2 className="text-center text-4xl font-bold text-red-900 mb-8">
          Sign In
        </h2>
        {errorMessage && (
          <div className="text-red-500 text-center font-bold">
            <p> {errorMessage} </p> <p> Invalid Username or Password</p>
          </div>
        )}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-6">
            <label
              htmlFor="email"
              className="block text-red-700 font-medium mb-2"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-3 border border-red-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="you@example.com"
              {...register("email", { required: true })}
            />
            {errors.email?.message}
          </div>

          <div className="mb-8">
            <label
              htmlFor="password"
              className="block text-red-700 font-medium mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-3 border border-red-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="********"
              {...register("password", { required: true })}
            />
            {errors.password?.message}
          </div>

          <button
            type="submit"
            className="w-full bg-red-600 text-white font-bold py-3 px-4 rounded-md hover:bg-red-700 focus:outline-none focus:bg-red-700"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}

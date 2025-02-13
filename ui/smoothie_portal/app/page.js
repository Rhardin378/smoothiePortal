"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useSelector } from "react-redux";

import { signin } from "./store/slices/authSlice.js";
import { resetAuth } from "./store/slices/authSlice.js";

const userSchema = Yup.object().shape({
  email: Yup.string().email().required("Please enter a valid email"),
  password: Yup.string().required("Password is required"),
});

export default function Home() {
  const status = useSelector((state) => state.auth.status);
  const errorMessage = useSelector((state) => state.auth.errorMessage);

  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetAuth());
    return () => {
      dispatch(resetAuth());
    };
  }, [dispatch]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userSchema),
    mode: "onChange",
  });

  // const validateSignIn = (signInAttempt) => {
  //   if (signInAttempt) {
  //     router.push("/manager/dashboard");
  //   }
  // };

  const onSubmit = async (data) => {
    try {
      const result = await dispatch(signin(data));
      if (!result.error && result.payload) {
        router.push("/manager/dashboard");
      }
      // validateSignIn(result);
    } catch (error) {
      console.error(error);
    }
  };

  const isLoading = status === "loading";
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
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            <p> {errorMessage} </p>
          </div>
        )}
        <form method="POST" onSubmit={handleSubmit(onSubmit)} noValidate>
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
              className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 
    ${errors.email ? "border-red-500" : "border-red-300"}`}
              placeholder="you@example.com"
              {...register("email")}
              disabled={isLoading}
            />
            {errors.email && (
              <p className="mt-1 text-red-500 text-sm">
                {errors.email.message}
              </p>
            )}
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
              disabled={isLoading}
            />
            {errors.password && (
              <p className="mt-1 text-red-500 text-sm">
                {errors.password?.message}
              </p>
            )}
          </div>

          <button
            disabled={isLoading}
            type="submit"
            className={`w-full bg-red-600 text-white font-bold py-3 px-4 rounded-md 
              ${
                isLoading
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-red-700 focus:bg-red-700"
              }
              focus:outline-none`}
          >
            {isLoading ? "Signing In..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}

"use client";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { signin, resetAuth } from "@/store/slices/authSlice";
import { FormField } from "@/components/molecules/FormField";
import { Button } from "@/components/atoms/Button";
import { Card } from "@/components/atoms/Card";
import { useColors } from "@/hooks/useColors";

const userSchema = Yup.object().shape({
  email: Yup.string().email().required("Please enter a valid email"),
  password: Yup.string().required("Password is required"),
});

export const LoginForm = () => {
  const { getTailwindClasses } = useColors();
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
    <Card className={`max-w-md w-full ${getTailwindClasses.card.primary} p-8`}>
      {/* Logo Container */}
      <div className="flex justify-center mb-8">
        <img
          src="./default.png"
          alt="Logo"
          className="h-32 w-32 drop-shadow-md transition-transform hover:scale-105"
        />
      </div>

      {/* Title */}
      <h2 className="text-center text-3xl font-bold text-red-900 mb-8">
        Welcome Back
      </h2>

      {/* Error Message */}
      {errorMessage && (
        <div className={`mb-6 p-4 ${getTailwindClasses.errorMessage}`}>
          <p className="text-sm">{errorMessage}</p>
        </div>
      )}

      {/* Form */}
      <form
        method="POST"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="space-y-6"
      >
        <FormField
          label="Email Address"
          name="email"
          error={errors.email?.message}
          validationRules={{
            required: "Email is required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Please enter a valid email address",
            },
          }}
          inputProps={{
            type: "email",
            placeholder: "you@example.com",
            disabled: isLoading,
            className: getTailwindClasses.input.base,
          }}
          register={register}
        />
        <FormField
          label="Password"
          name="password"
          error={errors.password?.message}
          validationRules={{
            required: "Password is required",
          }}
          inputProps={{
            type: "password",
            placeholder: "••••••••",
            disabled: isLoading,
            className:
              "w-full px-4 py-3 rounded-lg bg-white/80 backdrop-blur-sm border border-yellow-500/20 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all duration-200",
          }}
          register={register}
        />

        <Button
          type="submit"
          variant="primary"
          disabled={isLoading}
          className={`w-full py-3 ${getTailwindClasses.button.primary}`}
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <div className="spinner w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
              <span>Signing In...</span>
            </div>
          ) : (
            "Sign In"
          )}
        </Button>
      </form>
    </Card>
  );
};

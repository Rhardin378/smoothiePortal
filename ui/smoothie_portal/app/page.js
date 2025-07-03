"use client";

import React from "react";
import { LoginForm } from "./components/organisms/LoginForm";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-100 to-gray-300">
      <LoginForm />
    </div>
  );
}

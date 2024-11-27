import React from "react";
import { useRouter } from "next/navigation";

const Unauthorized = () => {
  const router = useRouter();
  const handleLoginRedirect = () => {
    router.push("/");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-2xl mb-4">Unauthorized Access</h1>
      <p className="text-lg mb-8">You must be signed in to view this page.</p>
      <button
        className="px-4 py-2 text-base cursor-pointer"
        onClick={handleLoginRedirect}
      >
        Go to Login
      </button>
    </div>
  );
};

export default Unauthorized;

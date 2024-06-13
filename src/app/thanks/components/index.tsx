"use client";

import { useRouter } from "next/navigation";

const Thanks = () => {
  const router = useRouter();

  const handleBackToHome = () => {
    router.push("/");
  };

  return (
    <div className="container mx-auto min-h-screen px-4 flex items-center justify-center text-center">
      <div>
        <h1 className="text-3xl font-bold mb-4">
          Thank You for Your Purchase!
        </h1>
        <p className="mb-8">
          Your transaction has been completed successfully.
        </p>
        <button onClick={handleBackToHome} className="underline text-green-500">
          Back to Homepage
        </button>
      </div>
    </div>
  );
};

export default Thanks;

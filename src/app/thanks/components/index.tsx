import { useRouter } from "next/router";

const Thanks = () => {
  const router = useRouter();

  const handleBackToHome = () => {
    router.push("/");
  };

  return (
    <div className="container mx-auto px-4 py-28 text-center">
      <h1 className="text-3xl font-bold mb-4">Thank You for Your Purchase!</h1>
      <p className="mb-8">Your transaction has been completed successfully.</p>
      <button onClick={handleBackToHome} className="btn btn-primary">
        Back to Homepage
      </button>
    </div>
  );
};

export default Thanks;

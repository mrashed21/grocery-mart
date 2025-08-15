"use client";
import Link from "next/link";

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center font-nunito bg-[#084C4E] text-white">
      <div className="text-center px-6 py-12 max-w-md rounded-2xl shadow-xl bg-[#5E8B8C]">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <p className="text-xl mb-6">Oops! Page not found.</p>
        <p className="mb-6">
          The page you're looking for doesn’t exist or was moved.
        </p>
        <Link
          href="/"
          className="inline-block bg-white text-[#084C4E] px-6 py-2 rounded-xl font-semibold hover:bg-gray-100 transition"
        >
          Go to Homepage
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;

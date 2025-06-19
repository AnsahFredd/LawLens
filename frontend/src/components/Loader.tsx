import React from "react";

const Loader = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white">
      {/* LawLens Logo/Name */}
      <h1 className="text-3xl font-bold mb-6 text-[#1f1f1f]">LawLens</h1>

      {/* Spinner */}
      <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );
};

export default Loader;

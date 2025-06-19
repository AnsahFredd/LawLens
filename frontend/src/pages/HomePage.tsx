import React from "react";
import Button from "../components/ui/Button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import toast from "react-hot-toast";

const HomePage = () => {
  const navigate = useNavigate();

  const { logout, token, user } = useAuth();
  return (
    <div className="container mx-auto w-full h-screen mt-8">
      <div className="flex flex-col gap-4 text-[#121417]">
        <h1 className="text-4xl">Dashboard</h1>
        <p className="text-[#61758A]">
          Welcome back {user?.name || "User"}! Here'a an overview of your recent
          activity amd key metrics.
        </p>
      </div>

      <div className="flex space-x-7 mt-8">
        <div className="w-[250px]">
          <Button
            label="Upload New Document"
            onClick={() => navigate("/document")}
            otherStyles="bg-[#0D80F2] text-white py-1.5 px-1 cursor-pointer"
          />
        </div>
        <div className="mt-12 flex gap-4">
          {token ? (
            <Button
              label="Logout"
              onClick={async () => {
                logout();
                toast.success("Logged out");
                navigate("/");
              }}
              otherStyles="bg-red-500 text-white py-1.5 px-4 hover:bg-red-600"
            />
          ) : (
            <Button
              label="Login"
              onClick={() => navigate("/login")}
              otherStyles="bg-black text-white py-1.5 px-4 hover:bg-gray-900"
            />
          )}
        </div>

        <div className="w-[250px] ">
          <Button
            label="Go to Search & QA"
            onClick={() => ""}
            otherStyles="bg-[#F0F2F5] text-[#121417] cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
